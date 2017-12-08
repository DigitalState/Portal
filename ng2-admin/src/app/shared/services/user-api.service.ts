import { Injectable, Injector } from '@angular/core';

import { Restangular } from 'ngx-restangular';

import { MicroserviceConfig, microserviceRestangularFactory } from '../providers/microservice.provider';
import { AppState } from '../../app.service';
import { AuthService } from '../modules/auth/auth.service';
import { DsBaseEntityApiService } from './base-entity-api.service';

import 'rxjs/Rx';

/**
 * The User API Service is a shared service for communication with the Authentication microservice.
 */
@Injectable()
export class UserApiService extends DsBaseEntityApiService<any> {

    constructor(public restangular: Restangular,
                protected injector: Injector,
                protected appState: AppState,
                protected auth: AuthService) {
        super(restangular, injector);

        let msConfig = new MicroserviceConfig();
        msConfig.name = 'authentication';
        msConfig.settings = this.appState.get('microservices')[msConfig.name];

        this.restangular = microserviceRestangularFactory(restangular, auth, msConfig);
    }

    /**
     * Fetch user account(s) by Identity UUID
     * @param identityUuid The UUID of the identity associated with the user(s)
     */
    loadUsersByIdentity(identityUuid: string): any {
        let params = {
            'identityUuid': identityUuid
        };
        return this.resource('users').getList(params);
    }
}

