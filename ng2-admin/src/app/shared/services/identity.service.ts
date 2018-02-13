import { Inject, Injectable, Injector } from '@angular/core';

import { Restangular } from 'ngx-restangular';

import { MicroserviceConfig, microserviceRestangularFactory } from '../providers/microservice.provider';
import { AppState } from '../../app.service';
import { AuthService } from '../modules/auth/auth.service';
import { DsBaseEntityApiService } from './base-entity-api.service';
import { IdentityUtils } from '../utils/identity.utils';
import { ApiUtils } from '../utils/api.utils';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import filter from 'lodash/filter';

@Injectable()
export class IdentityApiService extends DsBaseEntityApiService<any> {

    protected cache: {[name: string]: any } = {
        identitiesList: {},
        ownersList: null, // Array
    };

    constructor(public restangular: Restangular,
                protected injector: Injector,
                protected appState: AppState,
                protected auth: AuthService) {
        super(restangular, injector);

        let msConfig = new MicroserviceConfig();
        msConfig.name = 'identities';
        msConfig.settings = this.appState.get('microservices')[msConfig.name];

        this.restangular = microserviceRestangularFactory(restangular, auth, msConfig);
    }

    oneByType(identityType: string, id: string): any {
        let urlPrefix = IdentityUtils.getIdentityUrlPrefix(identityType);
        return this.one(urlPrefix, id);
    }

    getIdentityResource(identityType: string): any {
        let urlPrefix = IdentityUtils.getIdentityUrlPrefix(identityType);
        return this.resource(urlPrefix);
    }

    getPersonaResource(identityType: string): any {
        let urlPrefix = IdentityUtils.getPersonaUrlPrefix(identityType);
        return this.resource(urlPrefix);
    }

    getPersonas(identityType: string, identityUuid: string): any {
        let singular = IdentityUtils.getSingular(identityType);
        let resource = this.getPersonaResource(identityType);
        let params = {};
        params[singular + '.uuid'] = identityUuid;
        return resource.getList(params);
    }

    /**
     * Retrieve the list of identities. The generated list is cached per Identity type in this Singleton.
     *
     * @param identityType {string} The Identity type (`BusinessUnit`, `Organization`, etc...)
     * @return {Observable<T>|any}
     */
    getIdentitiesList(identityType: string): Observable< Array<any> > {
        if (this.cache.identitiesList[identityType]) {
            return Observable.of(this.cache.identitiesList[identityType]);
        }

        return this.getIdentityResource(identityType).getList().flatMap(identities => {
            // First, un-Restangularize each retrieved entity
            identities = identities.map(identity => identity.plain());

            // Cache the result if it contains one or more entities
            if (identities && identities.length > 0) {
                this.cache.identitiesList[identityType] = identities;
            }

            return Observable.of(identities);
        }).catch((response: Response) => {
            console.warn('Unable to fetch identities list.', response);
        });
    }

    /**
     * Retrieve the list of owner entities.
     * At the moment, this is limited to Business Units associated with the identity of
     * the current User.
     *
     * @return {Observable<T>|any} Obervable list of owner entities
     */
    getOwnersList(): Observable<any> {
        if (this.cache.ownersList) {
            return Observable.of(this.cache.ownersList);
        }

        const user = this.auth.getAuthUser();
        return this.getIdentityResource(user.identity).one('', user.identityUuid).get().flatMap(identity => {
            // Cleanup the array of owners by extracting the UUID from the URI
            const ownersUuids = identity.businessUnits.map(ApiUtils.getUuidFromUri);

            // Fetch all BusinessUnits and filter them by the current identity's business units
            return this.getIdentitiesList('BusinessUnit').flatMap(owners => {
                const filteredOwners = filter(owners, (owner: any) => {
                    return ownersUuids.indexOf(owner.uuid) > -1;
                });

                // Cache the result if it contains one or more entities
                if (filteredOwners && filteredOwners.length > 0) {
                    this.cache.ownersList = filteredOwners;
                }

                return Observable.of(filteredOwners);
            });
        }).catch((response: Response) => {
            console.warn('Unable to fetch Identity of current user.', response);
        });
    }
}

