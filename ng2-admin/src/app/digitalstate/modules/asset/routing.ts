import { Routes, RouterModule } from '@angular/router';

import { DsAssetComponent } from './asset.component';
import { DsAssetListComponent } from './components/asset-list.component';
import { DsAssetShowComponent } from './components/asset-show.component';
import { DsAssetCreateComponent } from './components/asset-create.component';
import { DsAssetEditComponent } from './components/asset-edit.component';

const routes: Routes = [

    // Default routerLink is `DsAssetListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsAssetComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/assets/list', pathMatch: 'full' },
            { path: 'list', component: DsAssetListComponent  },
            { path: 'create', component: DsAssetCreateComponent },
            { path: ':id/show', component: DsAssetShowComponent },
            { path: ':id/edit', component: DsAssetEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
