import { Routes, RouterModule } from '@angular/router';

import { DsDashboardComponent } from './components/dashboard.component';

const routes: Routes = [

    // Default route is `DsDashboardListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsDashboardComponent,
        children: [
            // Uncomment the following to have the default EMPTY routerLink redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },

            // { path: '', redirectTo: '/pages/dashboard/list', pathMatch: 'full' },
            // { path: 'list', component: DsDashboardListComponent  },
            // { path: 'create', component: DsDashboardCreateComponent },
            // { path: ':id/show', component: DsDashboardShowComponent },
            // { path: ':id/edit', component: DsDashboardEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
