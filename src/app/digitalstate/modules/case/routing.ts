import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { DsCaseComponent } from './case.component';
import { DsCaseListComponent } from './components/case-list.component';
import { DsCaseShowComponent } from './components/case-show.component';
import { DsCaseCreateComponent } from './components/case-create.component';
import { DsCaseEditComponent } from './components/case-edit.component';
const routes: Routes = [

    // Default route is `DsCaseListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsCaseComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/cases/list', pathMatch: 'full' },
            { path: 'list', component: DsCaseListComponent, canActivate: [AuthGuardService] },
            { path: 'create', component: DsCaseCreateComponent },
            { path: ':id/show', component: DsCaseShowComponent },
            { path: ':id/edit', component: DsCaseEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
