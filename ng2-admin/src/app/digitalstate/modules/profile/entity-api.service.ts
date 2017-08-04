import { Inject, Injectable } from '@angular/core';

import { Restangular } from 'ngx-restangular';

import {
    MICROSERVICE_RESTANGULAR, MicroserviceConfig,
    microserviceRestangularFactory
} from '../../../shared/providers/microservice.provider';
import { AppState } from '../../../app.service';
import { AuthService } from '../../../shared/modules/auth/auth.service';
import { DsBaseEntityApiService } from '../../../shared/services/base-entity-api.service';

import 'rxjs/Rx';

@Injectable()
export class EntityApiService extends DsBaseEntityApiService<any> {

    constructor(@Inject(MICROSERVICE_RESTANGULAR) public restangular) {
        super(restangular);
    }

}

@Injectable()
export class IdentityApiService extends DsBaseEntityApiService<any> {

    constructor(public restangular: Restangular,
                protected appState: AppState,
                protected auth: AuthService) {
        super();

        let msConfig = new MicroserviceConfig();
        msConfig.name = 'identities';
        msConfig.settings = this.appState.get('microservices')[msConfig.name];

        this.restangular = microserviceRestangularFactory(restangular, auth, msConfig);
    }

}
