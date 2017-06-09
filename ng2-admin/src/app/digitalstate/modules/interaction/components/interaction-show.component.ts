import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import 'rxjs/Rx';

@Component({
    selector: 'ds-interaction-show',
    templateUrl: '../templates/interaction-show.template.html'
})
export class DsInteractionShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'interactions';

    constructor(route: ActivatedRoute,
                router: Router,
                translate: TranslateService,
                toastr: ToastsManager,
                modal: NgbModal,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(route, router, translate, microserviceConfig, toastr, modal);
        this.entityApiService = entityApiService;
    }
}
