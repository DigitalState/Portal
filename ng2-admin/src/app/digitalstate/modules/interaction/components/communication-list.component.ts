import { Component, Injector } from '@angular/core';
import 'rxjs/Rx';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import { MicroserviceConfig } from '../../microservice.provider';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'ds-communication-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsCommunicationListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'communications';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {
        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
        ];
    }
}
