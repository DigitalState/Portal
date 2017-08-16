import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import { AuthService } from '../../../../shared/modules/auth/auth.service';
import { ApiUtils } from '../../../../shared/utils/api.utils';

import 'rxjs/Rx';
import isEmpty from 'lodash/isEmpty';

@Component({
    selector: 'ds-case-list',
    templateUrl: '../templates/case-list.template.html'
})
export class DsCaseListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'cases';
    pageTitle = 'general.menu.cases';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService,
                protected auth: AuthService) {
        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    setupQuery() {
        super.setupQuery();

        // Filter the list by Case Owner UUID in order to avoid the Access Denied error.
        // The Owner is assumed to be the first Business Unit that is stored in the User session object.
        let user = this.auth.getAuthUser();

        if (user) {
            if (user.extra && !isEmpty(user.extra['businessUnits'])) {
                // @Fixme Temporary assumption about first Business Unit is "TEMPORARY"
                let ownerUri = user.extra['businessUnits'][0];
                let ownerUuid = ApiUtils.getUuidFromUri(ownerUri);
                this.query.setFilter('ownerUuid', ownerUuid);
            }
            else {
                console.warn('No Business Units available under AuthUser');
                this.toastr.warning('No Business Units available under AuthUser'); // @TranslateMe
            }
        }
        else {
            console.warn('AuthUser is not defined');
            this.toastr.warning('AuthUser is not defined'); // @TranslateMe
        }
    }
}
