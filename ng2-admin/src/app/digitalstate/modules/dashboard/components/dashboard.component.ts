import { Component, Injector } from '@angular/core';

import { DsPageComponent } from '../../../../shared/components/page-component';


@Component({
    selector: 'ds-dashboard',
    templateUrl: '../templates/dashboard.template.html',
    styleUrls: ['../styles/dashboard.scss'],
})
export class DsDashboardComponent extends DsPageComponent {

    pageTitle = 'general.menu.dashboard';

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        this.commitBreadcrumb();
    }
}
