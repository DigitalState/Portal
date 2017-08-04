import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
    selector: 'ds-scenario-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsScenarioListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    headerTitle = 'general.menu.scenarios';
    headerSubtitle = '';

    protected routeParamsSubscription: Subscription;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    ngOnInit() {
        this.routeParamsSubscription = this.route.params.subscribe(params => {
            this.entityApiService.getOne(this.entityParentUrlPrefix, params[this.entityParentUrlParam]).subscribe(res => {
                this.entityParent = res;
                super.ngOnInit();
            });
        });
    }

    ngOnDestroy() {
        this.routeParamsSubscription.unsubscribe();
        super.ngOnDestroy();
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
            { prop: 'presentation', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
        ];
    }

    protected setupQuery(): void {
        super.setupQuery();
        this.query.setFilter('service.uuid', this.entityParent.uuid);
    }

    protected updateTranslations(newLang: string) {
        super.updateTranslations(newLang);

        if (this.entityParent.hasOwnProperty('title') && this.entityParent.title.hasOwnProperty(newLang)) {
            this.headerSubtitle = this.entityParent.title[newLang];
        }
    }
}
