import { Component, Injector } from '@angular/core';
import 'rxjs/Rx';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

@Component({
    selector: 'ds-task-list',
    templateUrl: '../templates/task-list.template.html'
})
export class DsTaskListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'tasks';
    pageTitle = 'general.menu.taskDirectory';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    /**
     * Overriding `preprocessRowsData` to skip the filtering of entities without translated `title` properties.
     * @param fetchedData
     * @returns {any}
     */
    protected preprocessRowsData(fetchedData): Array<any> {
        // Add metadata container including list actions
        let rows;
        if (fetchedData) {
            rows = fetchedData.map((row) => {
                row['_'] = {
                    'actions': this.actions
                };
                return row;
            });
        }

        return rows;
    }
}
