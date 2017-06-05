import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsAssetComponent } from './asset.component';
import { DsAssetListComponent } from './components/asset-list.component';
import { DsAssetShowComponent } from './components/asset-show.component';
import { DsAssetCreateComponent } from './components/asset-create.component';
import { DsAssetEditComponent } from './components/asset-edit.component';

export const MICROSERVICE_NAME = 'assets';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsAssetComponent,
        DsAssetListComponent,
        DsAssetShowComponent,
        DsAssetCreateComponent,
        DsAssetEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsAssetModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
