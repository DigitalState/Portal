import { Inject, Injectable } from '@angular/core';
import { MICROSERVICE_RESTANGULAR } from '../../modules/microservice.provider';
import { DsBaseEntityApiService } from '../../../shared/services/base-entity-api.service';

import 'rxjs/Rx';

@Injectable()
export class EntityApiService extends DsBaseEntityApiService<any> {

    constructor(@Inject(MICROSERVICE_RESTANGULAR) public restangular) {
        super(restangular);
    }

}
