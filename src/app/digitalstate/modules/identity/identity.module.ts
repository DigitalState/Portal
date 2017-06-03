import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsIdentityComponent } from './identity.component';
import { DsIdentityListComponent } from './components/identity-list.component';
import { DsIdentityShowComponent } from './components/identity-show.component';
import { DsIdentityCreateComponent } from './components/identity-create.component';
import { DsIdentityEditComponent } from './components/identity-edit.component';

export const MICROSERVICE_NAME = 'identities';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsIdentityComponent,
        DsIdentityListComponent,
        DsIdentityShowComponent,
        DsIdentityCreateComponent,
        DsIdentityEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsIdentityModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
