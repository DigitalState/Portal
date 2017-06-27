import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-create',
    templateUrl: '../templates/service-form.template.html'
})
export class DsServiceCreateComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'services';
    headerTitle = 'Create Service';
    isNew = true;

    constructor(injector: Injector,
                route: ActivatedRoute,
                router: Router,
                location: Location,
                translate: TranslateService,
                toastr: ToastsManager,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, route, router, location, microserviceConfig, toastr);

        this.translate = translate;
        this.entityApiService = entityApiService;
    }
}
