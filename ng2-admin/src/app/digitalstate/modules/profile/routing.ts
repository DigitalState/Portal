import { Routes, RouterModule } from '@angular/router';

import { DsProfileComponent } from './components/profile.component';

const routes: Routes = [

    // Default route is `DsProfileListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsProfileComponent,
        children: [
            // Uncomment the following to have the default EMPTY routerLink redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },

            // { path: '', redirectTo: '/pages/profile/list', pathMatch: 'full' },
            // { path: 'list', component: DsProfileListComponent  },
            // { path: 'create', component: DsProfileCreateComponent },
            // { path: ':id/show', component: DsProfileShowComponent },
            // { path: ':id/edit', component: DsProfileEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
