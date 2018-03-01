import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdProgressBarModule, MdListModule, MdTabsModule, MdToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgArrayPipesModule } from 'ngx-pipes';
// import { FilterByPipe } from 'ngx-pipes/src/app/pipes/array/filter-by';
// import { FilterByPipe } from 'ngx-pipes';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NgaModule } from '../../theme/nga.module';

import { DsSharedModule } from '../shared/shared.module';

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
import { DsLanguageSwitcherTabsComponent } from './components/language-switcher-tabs.component';
import { DsBackLink } from './components/back-link.component';
import { DsTranslatableIconComponent } from './components/translatable-icon.component';
import { DefaultModal } from './components/modals/default-modal/default-modal.component';
import { DsTimelineComponent } from './components/timeline.component';

@NgModule({
    imports: [
        DsSharedModule,
        CommonModule,
        RouterModule,
        FormsModule,
        MdListModule,
        NgArrayPipesModule,
        MdProgressBarModule,
        MdTabsModule,
        MdToolbarModule,
        TranslateModule,
    ],
    declarations: [
        DefaultModal,
        TemplateStorageComponent,
        DsMicroservicesComponent,
        DsEntityListComponent,
        DsEntityShowComponent,
        DsEntityFormComponent,
        DsTimelineComponent,
        DsDatatableHeader,
        DsDatatableCell,
        DsDatatableCellActions,
        DsLanguageSwitcherComponent,
        DsLanguageSwitcherTabsComponent,
        DsBackLink,
        DsTranslatableIconComponent,
    ],
    entryComponents: [
        DefaultModal,
    ],
    providers: [
        TemplateStorage,
        // FilterByPipe,
    ],
    exports: [
        DsSharedModule,
        MdTabsModule,
        DsMicroservicesComponent,
        DsEntityListComponent,
        DsEntityShowComponent,
        DsEntityFormComponent,
        DsTimelineComponent,
        DsDatatableHeader,
        DsDatatableCell,
        DsDatatableCellActions,
        DsLanguageSwitcherComponent,
        DsLanguageSwitcherTabsComponent,
        TranslateModule,
        InfiniteScrollModule,
        DsBackLink,
        DsTranslatableIconComponent,
    ]
})
export class DsMicroservicesModule {

}
