import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LaddaModule } from 'angular2-ladda';

import { routing } from './routing';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../../shared/providers/microservice.provider';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsDashboardComponent } from './components/dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        LaddaModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsDashboardComponent,
    ],
    providers: [
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsDashboardModule {

}
