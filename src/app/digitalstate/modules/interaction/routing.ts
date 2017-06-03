import { Routes, RouterModule } from '@angular/router';

import { DsInteractionComponent } from './interaction.component';
import { DsCommunicationListComponent } from './components/communication-list.component';
import { DsInteractionListComponent } from './components/interaction-list.component';
import { DsInteractionCreateComponent } from './components/interaction-create.component';
import { DsInteractionShowComponent } from './components/interaction-show.component';
import { DsInteractionEditComponent } from './components/interaction-edit.component';
import { DsCommunicationShowComponent } from './components/communication-show.component';
import { DsCommunicationCreateComponent } from './components/communication-create.component';
import { DsCommunicationEditComponent } from './components/communication-edit.component';

const routes: Routes = [

    // Default route is `DsCommunicationListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsInteractionComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/communications/list', pathMatch: 'full' },
            { path: 'communications/list', component: DsCommunicationListComponent  },
            { path: 'communications/create', component: DsCommunicationCreateComponent },
            { path: 'communications/:id/show', component: DsCommunicationShowComponent },
            { path: 'communications/:id/edit', component: DsCommunicationEditComponent },
            { path: 'interactions/list', component: DsInteractionListComponent  },
            { path: 'interactions/create', component: DsInteractionCreateComponent },
            { path: 'interactions/:id/show', component: DsInteractionShowComponent },
            { path: 'interactions/:id/edit', component: DsInteractionEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
