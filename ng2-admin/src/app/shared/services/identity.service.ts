import { Inject, Injectable, Injector } from '@angular/core';

import { Restangular } from 'ngx-restangular';

import { MicroserviceConfig, microserviceRestangularFactory } from '../providers/microservice.provider';
import { AppState } from '../../app.service';
import { AuthService } from '../modules/auth/auth.service';
import { DsBaseEntityApiService } from './base-entity-api.service';
import { IdentityUtils } from '../utils/identity.utils';

import 'rxjs/Rx';

@Injectable()
export class IdentityApiService extends DsBaseEntityApiService<any> {

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
}

