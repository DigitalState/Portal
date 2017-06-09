import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';
import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-individual-create',
    templateUrl: '../templates/form.template.html'
})
export class DsIndividualCreateComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'individuals';
    headerTitle = 'Create Individual';
    isNew = true;

    constructor(injector: Injector,
                route: ActivatedRoute,
                router: Router,
                location: Location,
                toastr: ToastsManager,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, route, router, location, microserviceConfig, toastr);
        this.entityApiService = entityApiService;
    }
}
