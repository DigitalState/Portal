import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { BreadcrumbsService } from './breadcrumbs.service';

import { AppTranslationModule } from '../../../app.translation.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AppTranslationModule,
        PerfectScrollbarModule,
    ],
    declarations: [
        BreadcrumbsComponent,
    ],
    providers: [

    ],
    exports: [
        BreadcrumbsComponent,
    ],
})
export class BreadcrumbsModule {

    /**
     * Singleton providers
     * @return ModuleWithProviders
     */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BreadcrumbsModule,
            providers: [
                BreadcrumbsService,
            ]
        };
    }

}