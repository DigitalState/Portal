import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from 'ng2-formio/dist/formio.component';
import { FormioAlertsComponent, FormioAlerts } from 'ng2-formio/dist/formio.alerts';
import { FormioLoader, FormioLoaderComponent } from 'ng2-formio/dist/formio.loader';
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
export { FormioAppConfig } from 'ng2-formio/dist/formio.config';
export { FormioLoader } from 'ng2-formio/dist/formio.loader';
