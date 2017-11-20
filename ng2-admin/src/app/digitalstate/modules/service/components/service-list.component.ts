import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-list',
    templateUrl: '../templates/service-list.template.html'
})
export class DsServiceListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'services';
    pageTitle = 'general.menu.serviceDirectory';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    setupQuery() {
        super.setupQuery();
        this.query.setFilter('order[weight]', 'asc');
    }
}
