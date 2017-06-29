import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsCaseComponent } from './case.component';
import { DsCaseListComponent } from './components/case-list.component';
import { DsCaseShowComponent } from './components/case-show.component';
import { DsCaseCreateComponent } from './components/case-create.component';
import { DsCaseEditComponent } from './components/case-edit.component';
import { DsSharedModule } from '../../../shared/shared.module';

export const MICROSERVICE_NAME = 'cases';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsSharedModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsCaseComponent,
        DsCaseListComponent,
        DsCaseShowComponent,
        DsCaseCreateComponent,
        DsCaseEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsCaseModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
