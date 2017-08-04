import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import 'rxjs/Rx';

@Component({
    selector: 'ds-case-show',
    templateUrl: '../templates/show.template.html'
})
export class DsCaseShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'cases';
    headerTitle = 'Case Details';

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }
}
