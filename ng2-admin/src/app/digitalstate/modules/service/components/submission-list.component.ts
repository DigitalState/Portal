import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
    selector: 'ds-submission-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsSubmissionListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'submissions';
    headerTitle = 'general.menu.submissions';
    headerSubtitle = '';

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }


    ngOnInit(): any {
        this.datatableAttributes.headerHeight = 45;

        this.actions.refresh = false;
        this.actions.create = false;
        this.actions.edit = false;

        return super.ngOnInit();
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'uuid', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: false, sortable: false },
            { prop: 'updatedAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
        ];
    }
}
