import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../../shared/providers/microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsTopicComponent } from './topic.component';
import { DsTopicListComponent } from './components/topic-list.component';
import { DsTopicShowComponent } from './components/topic-show.component';
import { DsTopicCreateComponent } from './components/topic-create.component';
import { DsTopicEditComponent } from './components/topic-edit.component';

export const MICROSERVICE_NAME = 'topics';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsTopicComponent,
        DsTopicListComponent,
        DsTopicShowComponent,
        DsTopicCreateComponent,
        DsTopicEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsTopicModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
