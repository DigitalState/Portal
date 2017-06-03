import { Routes, RouterModule } from '@angular/router';

import { DsIndividualComponent } from './individual.component';
import { DsIndividualListComponent } from './components/individual-list.component';
import { DsIndividualShowComponent } from './components/individual-show.component';
import { DsIndividualCreateComponent } from './components/individual-create.component';
import { DsIndividualEditComponent } from './components/individual-edit.component';

const routes: Routes = [

    // Default route is `DsIndividualListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsIndividualComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/individuals/list', pathMatch: 'full' },
            { path: 'list', component: DsIndividualListComponent  },
            { path: 'create', component: DsIndividualCreateComponent },
            { path: ':id/show', component: DsIndividualShowComponent },
            { path: ':id/edit', component: DsIndividualEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
