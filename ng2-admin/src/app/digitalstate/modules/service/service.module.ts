import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormioModule } from 'ng2-formio';

import { DsSharedModule } from '../../../shared/shared.module';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../../shared/providers/microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsServiceComponent } from './service.component';
import { DsServiceListComponent } from './components/service-list.component';
import { DsServiceShowComponent } from './components/service-show.component';
import { DsServiceCreateComponent } from './components/service-create.component';
import { DsServiceEditComponent } from './components/service-edit.component';
import { DsScenarioActivateComponent } from './components/scenario-activate.component';
import { DsScenarioListComponent } from './components/scenario-list.component';
import { DsScenarioShowComponent } from './components/scenario-show.component';
import { DsScenarioCreateComponent } from './components/scenario-create.component';
import { DsScenarioEditComponent } from './components/scenario-edit.component';
import { DsSubmissionListComponent } from './components/submission-list.component';
import { DsSubmissionShowComponent } from './components/submission-show.component';

export const MICROSERVICE_NAME = 'services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FormioModule,
        NgxDatatableModule,
        DsSharedModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsServiceComponent,
        DsServiceListComponent,
        DsServiceShowComponent,
        DsServiceCreateComponent,
        DsServiceEditComponent,
        DsScenarioActivateComponent,

        DsScenarioListComponent,
        DsScenarioShowComponent,
        DsScenarioCreateComponent,
        DsScenarioEditComponent,

        DsSubmissionListComponent,
        DsSubmissionShowComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsServiceModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
