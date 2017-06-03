import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import 'rxjs/Rx';

@Component({
    selector: 'ds-asset-show',
    templateUrl: '../templates/show.template.html'
})
export class DsAssetShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'assets';

    constructor(route: ActivatedRoute,
                router: Router,
                toastr: ToastsManager,
                modal: NgbModal,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(route, router, microserviceConfig, toastr, modal);
        this.entityApiService = entityApiService;
    }
}
