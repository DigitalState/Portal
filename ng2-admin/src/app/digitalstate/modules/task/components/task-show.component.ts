import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';

@Component({
    selector: 'ds-task-show',
    templateUrl: '../templates/task-show.template.html'
})
export class DsTaskShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'tasks';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {
        
        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    ngOnInit() {
        super.ngOnInit();
        this.backLink = new Link(['/pages/tasks'], 'general.menu.tasks');
    }
}
