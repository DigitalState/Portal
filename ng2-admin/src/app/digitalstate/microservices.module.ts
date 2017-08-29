import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdProgressBarModule, MdListModule, MdTabsModule, MdProgressSpinnerModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FilterByPipe } from 'ngx-pipes/src/app/pipes/object/filter-by';

import { AppTranslationModule } from '../app.translation.module';
import { AppState } from '../app.service';
import { NgaModule } from '../../theme/nga.module';

import { DsEnvironmentConfig } from '../shared/providers/environment.provider';
import { DSAuthModule } from '../shared/modules/auth/auth.module';

import { MicroservicesDefinition } from './microservices';
import { TemplateStorage } from './services/template-storage.service';
import { TemplateStorageComponent } from './components/template-storage.component';
import { DsMicroservicesComponent } from './components/microservices.component';
import { DsEntityListComponent } from './components/entity-list.component';
import { DsEntityShowComponent } from './components/entity-show.component';
import { DsEntityFormComponent } from './components/entity-form.component';
import { DsDatatableHeader } from './components/datatable/datatable-header.component';
import { DsDatatableCell } from './components/datatable/datatable-cell.component';
import { DsDatatableCellActions } from './components/datatable/datatable-cell-actions.component';
import { DsLanguageSwitcherComponent } from './components/language-switcher.component';
import { DsBackLink } from './components/back-link.component';
import { DefaultModal } from './components/modals/default-modal/default-modal.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MdListModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdTabsModule,
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
        DsLanguageSwitcherComponent,
        DsBackLink,
    ],
    entryComponents: [
        DefaultModal,
    ],
    providers: [
        TemplateStorage,
    ],
    exports: [
        MdTabsModule,
        MdProgressSpinnerModule,
        DsMicroservicesComponent,
        DsEntityListComponent,
        DsEntityShowComponent,
        DsEntityFormComponent,
        DsDatatableHeader,
        DsDatatableCell,
        DsDatatableCellActions,
        DsLanguageSwitcherComponent,
        // AppTranslationModule,
        TranslateModule,
    ]
})
export class DsMicroservicesModule {

    constructor(private appState: AppState, dsEnv: DsEnvironmentConfig) {
        let msDefinition = new MicroservicesDefinition(dsEnv);
        appState.set('microservices', msDefinition.getAll());
    }

}
