import { Component } from '@angular/core';
import 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import { MicroserviceConfig } from '../../microservice.provider';

@Component({
    selector: 'ds-service-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsServiceListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'services';

    constructor(translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {
        super(translate, microserviceConfig);
        this.entityApiService = entityApiService;

    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
            { prop: 'form', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
        ];
    }
}
