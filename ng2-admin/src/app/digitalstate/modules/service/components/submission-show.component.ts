import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import 'rxjs/Rx';

@Component({
    selector: 'ds-submission-show',
    templateUrl: '../templates/submission-show.template.html'
})
export class DsSubmissionShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'submissions';
    headerTitle = 'Submission Details';
    headerSubtitle = null;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;

        // Create a place-holder for the back-link until it gets generated
        // this.backLink = this.getEmptyBackLink();
    }

    ngOnInit(): any {
        // this.actions.edit = false;

        return super.ngOnInit();
    }
}
