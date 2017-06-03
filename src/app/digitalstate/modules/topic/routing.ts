import { Routes, RouterModule } from '@angular/router';

import { DsTopicComponent } from './topic.component';
import { DsTopicListComponent } from './components/topic-list.component';
import { DsTopicShowComponent } from './components/topic-show.component';
import { DsTopicCreateComponent } from './components/topic-create.component';
import { DsTopicEditComponent } from './components/topic-edit.component';

const routes: Routes = [

    // Default route is `DsTopicListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsTopicComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/topics/list', pathMatch: 'full' },
            { path: 'list', component: DsTopicListComponent  },
            { path: 'create', component: DsTopicCreateComponent },
            { path: ':id/show', component: DsTopicShowComponent },
            { path: ':id/edit', component: DsTopicEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
