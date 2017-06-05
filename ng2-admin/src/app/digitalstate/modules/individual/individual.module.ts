import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsIndividualComponent } from './individual.component';
import { DsIndividualListComponent } from './components/individual-list.component';
import { DsIndividualShowComponent } from './components/individual-show.component';
import { DsIndividualCreateComponent } from './components/individual-create.component';
import { DsIndividualEditComponent } from './components/individual-edit.component';

export const MICROSERVICE_NAME = 'individuals';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsIndividualComponent,
        DsIndividualListComponent,
        DsIndividualShowComponent,
        DsIndividualCreateComponent,
        DsIndividualEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsIndividualModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
