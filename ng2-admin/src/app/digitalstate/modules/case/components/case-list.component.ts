import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-case-list',
    templateUrl: '../templates/case-list.template.html'
})
export class DsCaseListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'cases';
    pageTitle = 'general.menu.cases';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {
        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }
}
