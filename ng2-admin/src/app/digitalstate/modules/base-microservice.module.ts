import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppState } from '../../app.service';
import { NgaModule } from '../../theme/nga.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormioModule } from 'angular-formio';

import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../shared/providers/microservice.provider';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        FormioModule,
        NgxDatatableModule,
    ],
    declarations: [

    ],
    providers: [
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})

export abstract class DsBaseMicroserviceModule {

    public microserviceName: string = null;

    // set the Microservice config in the constructor
    constructor(protected appState: AppState,
                protected msConfig: MicroserviceConfig) {

        msConfig.name = this.getMicroserviceName();
        msConfig.settings = this.appState.get('microservices')[msConfig.name];
    }

    /**
     * Override this value in child modules and provide the microservice's name.
     * return {string}
     */
    abstract getMicroserviceName(): string;
}
