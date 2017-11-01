import { Routes, RouterModule }  from '@angular/router';

import { Login } from './login.component';
import { OrganizationLogin } from './organization-login.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'organization',
    component: OrganizationLogin
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
