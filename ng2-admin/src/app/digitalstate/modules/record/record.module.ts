import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../../shared/providers/microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsRecordComponent } from './record.component';
import { DsRecordListComponent } from './components/record-list.component';
import { DsRecordShowComponent } from './components/record-show.component';
import { DsRecordCreateComponent } from './components/record-create.component';
import { DsRecordEditComponent } from './components/record-edit.component';

export const MICROSERVICE_NAME = 'records';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsRecordComponent,
        DsRecordListComponent,
        DsRecordShowComponent,
        DsRecordCreateComponent,
        DsRecordEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsRecordModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
