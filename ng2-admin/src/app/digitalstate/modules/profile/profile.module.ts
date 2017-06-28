import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';

import { DsEntityTranslatePipe } from '../../components/pipes/EntityTranslate.pipe';
import { EntityApiService, IdentityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../microservice.provider';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsProfileComponent } from './components/profile.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsProfileComponent,
    ],
    providers: [
        EntityApiService,
        IdentityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
        DsEntityTranslatePipe
    ]
})
export class DsProfileModule {

}
