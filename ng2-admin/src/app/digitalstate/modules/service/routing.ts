import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../../shared/modules/auth/auth-guard.service';
import { DsServiceComponent } from './service.component';
import { DsServiceListComponent } from './components/service-list.component';
import { DsServiceShowComponent } from './components/service-show.component';
import { DsServiceCreateComponent } from './components/service-create.component';
import { DsServiceEditComponent } from './components/service-edit.component';

import { DsScenarioListComponent } from './components/scenario-list.component';
import { DsScenarioShowComponent } from './components/scenario-show.component';
import { DsScenarioCreateComponent } from './components/scenario-create.component';
import { DsScenarioEditComponent } from './components/scenario-edit.component';
import { DsScenarioActivateComponent } from './components/scenario-activate.component';

import { DsSubmissionListComponent } from './components/submission-list.component';
import { DsSubmissionShowComponent } from './components/submission-show.component';

const routes: Routes = [

    // Default routerLink is `DsServiceListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsServiceComponent,
        canActivate: [AuthGuardService],
        children: [
            // Uncomment the following to have the default EMPTY routerLink redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/services/list', pathMatch: 'full' },
            { path: 'list', component: DsServiceListComponent },
            { path: 'create', component: DsServiceCreateComponent },
            { path: ':id/show', component: DsServiceShowComponent },
            { path: ':id/edit', component: DsServiceEditComponent },

            { path: ':serviceUuid/scenarios/list', component: DsScenarioListComponent },
            { path: ':serviceUuid/scenarios/create', component: DsScenarioCreateComponent },
            { path: ':serviceUuid/scenarios/:id/show', component: DsScenarioShowComponent },
            { path: ':serviceUuid/scenarios/:id/edit', component: DsScenarioEditComponent },
            { path: ':serviceUuid/scenarios/:id/activate', component: DsScenarioActivateComponent },

            { path: 'submissions/list', component: DsSubmissionListComponent},
            { path: 'submissions/:id/show', component: DsSubmissionShowComponent},
            // { path: ':scenarioUuid/submissions/:id/show', component: DsSubmissionShowComponent},
        ]
    }
];

export const routing = RouterModule.forChild(routes);
