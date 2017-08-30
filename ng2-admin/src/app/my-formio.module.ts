import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from 'angular-formio/dist/formio.component';
import { FormioAlertsComponent, FormioAlerts } from 'angular-formio/dist/formio.alerts';
import { FormioLoader, FormioLoaderComponent } from 'angular-formio/dist/formio.loader';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FormioComponent,
        FormioLoaderComponent,
        FormioAlertsComponent
    ],
    exports: [
        FormioComponent,
        FormioLoaderComponent,
        FormioAlertsComponent
    ],
    providers: [
        FormioLoader,
        FormioAlerts
    ]
})
export class FormioModule {}
export { FormioAppConfig } from 'angular-formio/dist/formio.config';
export { FormioLoader } from 'angular-formio/dist/formio.loader';
