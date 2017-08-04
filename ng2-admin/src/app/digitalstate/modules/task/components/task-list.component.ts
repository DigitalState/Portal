import { Component, Injector } from '@angular/core';
import 'rxjs/Rx';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'ds-task-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsTaskListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'tasks';

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
