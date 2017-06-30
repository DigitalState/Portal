import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { ListQuery } from '../../../models/api-query';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-service-show',
    templateUrl: '../templates/service-show.template.html',
    styleUrls: ['../styles/service-show.scss'],
})
export class DsServiceShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'services';
    headerTitle = 'Service Details';
    scenarios: Array<any>;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    ngOnInit() {
        super.ngOnInit();
        this.applyPageTitle();
    }

    protected prepareEntity(): Observable<{ entity: any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap(preparedObject => {
            this.entityApiService.resource('scenarios').getList({'service.uuid': preparedObject.entity.uuid}).subscribe(scenariosData => {
                this.scenarios = [];
                scenariosData.forEach((scenario) => {
                    this.scenarios.push(scenario);
                });
            });

            return Observable.of({'entity': preparedObject.entity, 'entityParent': preparedObject.entityParent});
        });
    }
}
