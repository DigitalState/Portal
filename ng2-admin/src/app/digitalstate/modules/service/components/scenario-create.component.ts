import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';

import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-scenario-create',
    templateUrl: '../templates/scenario-form.template.html'
})
export class DsScenarioCreateComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    headerTitle = 'Add Scenario';
    isNew = true;

    protected routeParamsSubscription: Subscription;

    constructor(injector: Injector,
                route: ActivatedRoute,
                router: Router,
                location: Location,
                translate: TranslateService,
                toastr: ToastsManager,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);

        this.translate = translate;
        this.entityApiService = entityApiService;

        // Create a place-holder for the back-link until it gets generated
        this.backLink = this.getEmptyBackLink();
    }

    ngOnInit() {
        this.routeParamsSubscription = this.route.params.subscribe(params => {
            this.entityApiService.getOne(this.entityParentUrlPrefix, params[this.entityParentUrlParam]).subscribe(res => {
                this.entityParent = res;
                super.ngOnInit();
            });
        });
    }

    /**
     * Add the `Service` association to the newly created `Scenario` entity by assigning
     * the service's IRI to the `service` property.
     */
    protected createBlankEntity(): any {
        return super.createBlankEntity().flatMap(entity => {
            entity.service = '/' + this.entityParentUrlPrefix + '/' + this.entityParent.uuid;
            return Observable.of(entity);
        });
    }

    saveNewEntity(): any {
        // this.entity['data'] = JSON.parse(this.entity['data']);
        return super.saveNewEntity();
    }
}
