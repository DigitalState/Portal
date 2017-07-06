import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import 'rxjs/Rx';

@Component({
    selector: 'ds-identity-show',
    templateUrl: '../templates/show.template.html'
})
export class DsIdentityShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'identities';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {
        
        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }
}