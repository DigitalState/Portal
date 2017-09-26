import { Routes, RouterModule } from '@angular/router';

import { DsTaskComponent } from './task.component';
import { DsTaskListComponent } from './components/task-list.component';
import { DsTaskActivateComponent } from './components/task-activate.component';
import { DsTaskShowComponent } from './components/task-show.component';
// import { DsTaskCreateComponent } from './components/task-create.component';
// import { DsTaskEditComponent } from './components/task-edit.component';

const routes: Routes = [

    // Default route is `DsTaskListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsTaskComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/tasks/list', pathMatch: 'full' },
            { path: 'list', component: DsTaskListComponent  },
            { path: ':id/activate', component: DsTaskActivateComponent },
            { path: ':id/show', component: DsTaskShowComponent },
            // { path: 'create', component: DsTaskCreateComponent },
            // { path: ':id/edit', component: DsTaskEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
