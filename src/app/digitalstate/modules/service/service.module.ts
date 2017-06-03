import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormioModule } from 'ng2-formio';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsServiceComponent } from './service.component';
import { DsServiceListComponent } from './components/service-list.component';
import { DsServiceShowComponent } from './components/service-show.component';
import { DsServiceCreateComponent } from './components/service-create.component';
import { DsServiceEditComponent } from './components/service-edit.component';
import { DsServiceActivateComponent } from './components/service-activate.component';
import {AppTranslationModule} from '../../../app.translation.module';


export const MICROSERVICE_NAME = 'services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // AppTranslationModule,
        FormioModule,
        NgxDatatableModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsServiceComponent,
        DsServiceListComponent,
        DsServiceShowComponent,
        DsServiceCreateComponent,
        DsServiceEditComponent,
        DsServiceActivateComponent,
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
