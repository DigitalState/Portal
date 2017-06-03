import { Inject, Injectable } from '@angular/core';
import { MICROSERVICE_RESTANGULAR } from '../../modules/microservice.provider';
import { DsBaseEntityApiService } from '../../services/base-entity-api.service';

import 'rxjs/Rx';

@Injectable()
export class EntityApiService extends DsBaseEntityApiService<any> {

    constructor(@Inject(MICROSERVICE_RESTANGULAR) protected restangular) {
        super(restangular);
    }

}
