import { Observable } from 'rxjs';

import { Inject, Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Pager } from '../../models/pager';
import { PagedData } from '../../models/paged-data';
import { Service } from '../../modules/service/models/service';
import { ListQuery } from '../../models/api-query';
import { MICROSERVICE_RESTANGULAR } from '../../modules/microservice.provider';
import { DsBaseEntityApiService } from '../../../shared/services/base-entity-api.service';

import 'rxjs/Rx';

@Injectable()
export class EntityApiService extends DsBaseEntityApiService<any> {

    constructor(@Inject(MICROSERVICE_RESTANGULAR) public restangular) {
        super(restangular);
        console.log('Calling base EntityApiService from Service Api Service');
    }

}
