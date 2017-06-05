import { Routes, RouterModule } from '@angular/router';

import { DsRecordComponent } from './record.component';
import { DsRecordListComponent } from './components/record-list.component';
import { DsRecordShowComponent } from './components/record-show.component';
import { DsRecordCreateComponent } from './components/record-create.component';
import { DsRecordEditComponent } from './components/record-edit.component';

const routes: Routes = [

    // Default route is `DsRecordListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsRecordComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/records/list', pathMatch: 'full' },
            { path: 'list', component: DsRecordListComponent  },
            { path: 'create', component: DsRecordCreateComponent },
            { path: ':id/show', component: DsRecordShowComponent },
            { path: ':id/edit', component: DsRecordEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
