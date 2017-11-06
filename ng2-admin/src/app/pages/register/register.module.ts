import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdCheckboxModule } from '@angular/material';

import { LaddaModule } from 'angular2-ladda';

import { NgaModule } from '../../theme/nga.module';
import { AppTranslationModule } from '../../app.translation.module'
import { DsMicroservicesModule } from '../../digitalstate/microservices.module';

import { Register } from './register.component';
import { routing }       from './register.routing';

@NgModule({
    imports: [
        CommonModule,
        MdCheckboxModule,
        AppTranslationModule,
        ReactiveFormsModule,
        FormsModule,
        LaddaModule,
        NgaModule,
        DsMicroservicesModule,
        routing
    ],
    declarations: [
        Register
    ]
})
export class RegisterModule {
}
