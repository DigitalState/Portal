import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../../shared/providers/microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsTaskComponent } from './task.component';
import { DsTaskListComponent } from './components/task-list.component';
import { DsTaskShowComponent } from './components/task-show.component';
import { DsTaskCreateComponent } from './components/task-create.component';
import { DsTaskEditComponent } from './components/task-edit.component';

export const MICROSERVICE_NAME = 'tasks';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsTaskComponent,
        DsTaskListComponent,
        DsTaskShowComponent,
        DsTaskCreateComponent,
        DsTaskEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsTaskModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
