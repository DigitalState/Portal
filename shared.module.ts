import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdProgressSpinnerModule, MdSelect, MdSelectModule } from '@angular/material';
import { MdProgressBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule, DateFormatPipe, LocalTimePipe, LocalePipe, TimeAgoPipe } from 'angular2-moment';
import { MomentTimezoneModule } from 'angular-moment-timezone';
import { ClipboardModule } from 'ngx-clipboard';

// import { AppTranslationModule } from '../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { DsBaseEntityApiService } from './services/base-entity-api.service';

import { MICROSERVICES } from './microservices';
import { CmsApiService } from './services/cms.service';
import { CmsTranslateLoader } from './services/cms-translation-loader.service';
import { IdentityApiService } from './services/identity.service';
import { UserApiService } from './services/user-api.service';
import { ThemerService } from './services/themer.service';
import { FormioApiService } from './services/formio-api.service';
import { FormioModalFrameComponent } from './components/modals/formio-modal-frame.component';
import { CredentialsVerificationModalComponent } from './components/modals/credentials-verification-modal/credentials-verification-modal.component';
import { DsRelativeTimeComponent } from './components/relative-time.component';
import { DsLanguageSwitcherDropdownComponent } from './components/language-switcher-dropdown.component';
import { KeyValuePipe } from './components/pipes/KeyValue.pipe';
import { IsEmpty, IsNotEmpty } from './components/pipes/lodash-helper.pipe';
import { DsEntityTranslatePipe } from './components/pipes/EntityTranslate.pipe';
import { DsEntityTranslationService } from './services/entity-translation.service';
import { DsStaticTranslationService } from './services/static-translation.service';
import { DsStaticTranslatePipe } from './components/pipes/static-translate.pipe';
import { DsClipboardCopyComponent } from './components/directives/ds-clipboard-copy.component';
import { DsShortUuidComponent } from './components/short-uuid.component';
import { DsFileUploadComponent } from './components/file-upload.component';
import { DsThemerPipe } from './components/pipes/themer.pipe';
import { OwnerSelectComponent } from './components/form/owner-select.component';
import { IdentityLinkComponent } from './components/identity-link.component';

import { authHttpServiceFactory, DsAuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthGuardService } from './modules/auth/auth-guard.service';
import { AuthHttp } from 'angular2-jwt';
import { AppState } from '../app.service';
import { Http, RequestOptions } from '@angular/http';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MdProgressSpinnerModule,
        MdSelectModule,
        TranslateModule,
        MomentModule,
        MomentTimezoneModule,
        ClipboardModule,
        DsAuthModule,
    ],
    declarations: [
        IsEmpty, IsNotEmpty, // lodash helpers
        KeyValuePipe,
        DsEntityTranslatePipe,
        DsStaticTranslatePipe,
        DsRelativeTimeComponent,
        DsLanguageSwitcherDropdownComponent,
        DsClipboardCopyComponent,
        DsShortUuidComponent,
        DsFileUploadComponent,
        DsThemerPipe,
        FormioModalFrameComponent,
        CredentialsVerificationModalComponent,
        OwnerSelectComponent,
        IdentityLinkComponent,
    ],
    entryComponents: [
        FormioModalFrameComponent,
        CredentialsVerificationModalComponent,
    ],
    providers: [
        DateFormatPipe,
        // Singleton providers are defined in the static forRoot() method below
    ],
    exports: [
        MdProgressSpinnerModule,
        MdSelectModule,
        TranslateModule,
        ClipboardModule,
        IsEmpty, IsNotEmpty, // lodash helpers
        KeyValuePipe,
        DsEntityTranslatePipe,
        DsStaticTranslatePipe,
        DateFormatPipe,
        LocalePipe,
        LocalTimePipe,
        TimeAgoPipe,
        DsRelativeTimeComponent,
        DsLanguageSwitcherDropdownComponent,
        DsClipboardCopyComponent,
        DsShortUuidComponent,
        DsFileUploadComponent,
        DsThemerPipe,
        OwnerSelectComponent,
        IdentityLinkComponent,
    ]
})
export class DsSharedModule {

    /**
     * Singleton providers
     * @return ModuleWithProviders
     */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DsSharedModule,
            providers: [
                DsEntityTranslationService,
                DsStaticTranslationService,
                CmsApiService,
                CmsTranslateLoader,
                IdentityApiService,
                UserApiService,
                FormioApiService,
                ThemerService,

                // Adopted submodules providers
                AuthService,
                AuthGuardService,
                {
                    provide: AuthHttp,
                    useFactory: authHttpServiceFactory,
                    deps: [AppState, Http, RequestOptions]
                }
            ]
        };
    }

}
