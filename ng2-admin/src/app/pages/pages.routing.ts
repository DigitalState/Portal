import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {AuthGuardService} from '../shared/modules/auth/auth-guard.service';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'services', pathMatch: 'full' },
      { path: 'profile', loadChildren: 'app/digitalstate/modules/profile/profile.module#DsProfileModule' },
      { path: 'services', loadChildren: 'app/digitalstate/modules/service/service.module#DsServiceModule' },
      { path: 'cases', loadChildren: 'app/digitalstate/modules/case/case.module#DsCaseModule' },
      // { path: 'assets', loadChildren: 'app/digitalstate/modules/asset/asset.module#DsAssetModule' },
      // { path: 'topics', loadChildren: 'app/digitalstate/modules/topic/topic.module#DsTopicModule' },
      // { path: 'tasks', loadChildren: 'app/digitalstate/modules/task/task.module#DsTaskModule' },
      // { path: 'records', loadChildren: 'app/digitalstate/modules/record/record.module#DsRecordModule' },
      // { path: 'interactions', loadChildren: 'app/digitalstate/modules/interaction/interaction.module#DsInteractionModule' },
      // { path: 'individuals', loadChildren: 'app/digitalstate/modules/individual/individual.module#DsIndividualModule' },
      // { path: 'identities', loadChildren: 'app/digitalstate/modules/identity/identity.module#DsIdentityModule' },
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'editors', loadChildren: 'app/pages/editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: 'app/pages/components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: 'app/pages/charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: 'app/pages/forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
