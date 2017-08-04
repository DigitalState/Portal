import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-edit',
    templateUrl: '../templates/service-form.template.html'
})
export class DsServiceEditComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'services';
    headerTitle = 'Edit Service';
    isNew = false;

    constructor(injector: Injector,
                route: ActivatedRoute,
                router: Router,
                location: Location,
                translate: TranslateService,
                toastr: ToastsManager,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);

        this.entityApiService = entityApiService;
        this.translate = translate;
    }
}
