import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AppTranslationModule } from '../app.translation.module';
import { AppState } from '../app.service';
import { NgaModule } from '../../theme/nga.module';

import { DsBaseEntityApiService } from './services/base-entity-api.service';
import { DsServiceModule } from './modules/service/service.module';
import { DSAuthModule } from './modules/auth/auth.module';

import { MICROSERVICES } from './microservices';
import { TemplateStorage } from './services/template-storage.service';
import { TemplateStorageComponent } from './components/template-storage.component';
import { DsMicroservicesComponent } from './components/microservices.component';
import { DsEntityListComponent } from './components/entity-list.component';
import { DsEntityShowComponent } from './components/entity-show.component';
import { DsEntityFormComponent } from './components/entity-form.component';
import { DsDatatableHeader } from './components/datatable/datatable-header.component';
import { DsDatatableCell } from './components/datatable/datatable-cell.component';
import { DsDatatableCellActions } from './components/datatable/datatable-cell-actions.component';
import { DSLanguageSwitcherComponent } from './components/language-switcher.component';
import { DefaultModal } from './components/modals/default-modal/default-modal.component';
import { KeyValuePipe } from './components/pipes/KeyValue.pipe';
import {DsEntityTranslatePipe} from './components/pipes/EntityTranslate.pipe';
import {DsEntityTranslationService} from './services/entity-translation.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        // AppTranslationModule,
        TranslateModule,
        DSAuthModule,
    ],
    declarations: [
        DefaultModal,
        TemplateStorageComponent,
        DsMicroservicesComponent,
        DsEntityListComponent,
        DsEntityShowComponent,
        DsEntityFormComponent,
        DsDatatableHeader,
        DsDatatableCell,
        DsDatatableCellActions,
        DSLanguageSwitcherComponent,
        KeyValuePipe,
        DsEntityTranslatePipe,
    ],
    entryComponents: [
        DefaultModal,
    ],
    providers: [
        DsEntityTranslationService,
        TemplateStorage,
    ],
    exports: [
        DsMicroservicesComponent,
        DsEntityListComponent,
        DsEntityShowComponent,
        DsEntityFormComponent,
        DsDatatableHeader,
        DsDatatableCell,
        DsDatatableCellActions,
        DSLanguageSwitcherComponent,
        KeyValuePipe,
        DsEntityTranslatePipe,
        // AppTranslationModule,
        TranslateModule,
    ]
})
export class DsMicroservicesModule {

    constructor(private appState: AppState) {
        appState.set('microservices', MICROSERVICES);
    }

}
