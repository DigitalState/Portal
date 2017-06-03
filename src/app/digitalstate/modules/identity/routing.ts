import { Routes, RouterModule } from '@angular/router';

import { DsIdentityComponent } from './identity.component';
import { DsIdentityListComponent } from './components/identity-list.component';
import { DsIdentityShowComponent } from './components/identity-show.component';
import { DsIdentityCreateComponent } from './components/identity-create.component';
import { DsIdentityEditComponent } from './components/identity-edit.component';

const routes: Routes = [

    // Default route is `DsIdentityListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsIdentityComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/identities/list', pathMatch: 'full' },
            { path: 'list', component: DsIdentityListComponent  },
            { path: 'create', component: DsIdentityCreateComponent },
            { path: ':id/show', component: DsIdentityShowComponent },
            { path: ':id/edit', component: DsIdentityEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
