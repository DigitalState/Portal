import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import 'rxjs/Rx';

@Component({
    selector: 'ds-communication-show',
    templateUrl: '../templates/communication-show.template.html'
})
export class DsCommunicationShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'communications';

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
