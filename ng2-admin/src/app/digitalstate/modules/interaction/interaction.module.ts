import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsInteractionComponent } from './interaction.component';
import { DsInteractionListComponent } from './components/interaction-list.component';
import { DsInteractionCreateComponent } from './components/interaction-create.component';
import { DsInteractionShowComponent } from './components/interaction-show.component';
import { DsInteractionEditComponent } from './components/interaction-edit.component';
import { DsCommunicationListComponent } from './components/communication-list.component';
import { DsCommunicationShowComponent } from './components/communication-show.component';
import { DsCommunicationCreateComponent } from './components/communication-create.component';
import { DsCommunicationEditComponent } from './components/communication-edit.component';

export const MICROSERVICE_NAME = 'interactions';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsInteractionComponent,
        DsInteractionListComponent,
        DsInteractionShowComponent,
        DsInteractionCreateComponent,
        DsInteractionEditComponent,
        DsCommunicationListComponent,
        DsCommunicationShowComponent,
        DsCommunicationCreateComponent,
        DsCommunicationEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsInteractionModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
