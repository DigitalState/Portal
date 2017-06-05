import { Component } from '@angular/core';
import 'rxjs/Rx';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import { MicroserviceConfig } from '../../microservice.provider';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'ds-identity-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsIdentityListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'identities';

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
        ];
    }
}
