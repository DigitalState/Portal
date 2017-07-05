import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NgaModule } from '../../theme/nga.module';
import { DsMicroservicesModule } from '../../digitalstate/microservices.module';

import { Login } from './login.component';
import { routing }       from './login.routing';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    LaddaModule,
    NgaModule,
    DsMicroservicesModule,
    routing
  ],
  declarations: [
    Login
  ]
})
export class LoginModule {}
