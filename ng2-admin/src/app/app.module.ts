import {ApplicationRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {createInputTransfer, createNewHosts, removeNgStyles} from '@angularclass/hmr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { LockerModule, DRIVERS } from 'angular-safeguard';

/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {routing} from './app.routing';
// App is our top level component
import {App} from './app.component';
import {AppState, InternalStateType} from './app.service';
import {GlobalState} from './global.state';
import {NgaModule} from './theme/nga.module';
import {PagesModule} from './pages/pages.module';
//
import {RestangularModule} from 'ngx-restangular';
import {FormioAppConfig} from 'angular-formio';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import {LaddaModule} from 'angular2-ladda';
import { DsSharedModule } from './shared/shared.module';
import { DsMicroservicesModule } from './digitalstate/microservices.module';

import * as _ from 'lodash';

import APP_CONFIG from './app.config';
import { CmsTranslateLoader } from './shared/services/cms-translation-loader.service';
import { CmsApiService } from './shared/services/cms.service';

// Application wide providers
const APP_PROVIDERS = [
    AppState,
    GlobalState
];

export type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

// Function for setting the default restangular configuration
export function restangularConfigFactory(restangularProvider) {
    // restangularProvider.setBaseUrl('http://localhost:8014/');
    // restangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
    // JSON-LD @id support
    restangularProvider.setRestangularFields({
        id: '@id',
        // selfLink: '@id'
    });
    restangularProvider.setSelfLinkAbsoluteUrl(false);

    // Hydra collections support
    restangularProvider.addResponseInterceptor(function (data, operation) {
        // Remove trailing slash to make Restangular working
        function populateHref(record) {
            if (!_.isEmpty(record) && record['@id']) {
                record['@id'] = record['@id'].replace('app_dev.php/', '');
                record.href = record['@id'].substring(1);
            }
        }

        // Populate href property for the collection
        populateHref(data);

        if ('getList' === operation) {
            let collectionResponse = data['hydra:member'];
            collectionResponse.metadata = {};

            // Put metadata in a property of the collection
            _.forEach(data, function (value, key) {
                if ('hydra:member' !== key) {
                    collectionResponse.metadata[key] = value;
                }
            });

            // Populate href property for all elements of the collection
            _.forEach(collectionResponse, function (value) {
                populateHref(value);
            });

            return collectionResponse;
        }

        return data;
    });
}

export function createTranslateLoader(http: Http, cms: CmsApiService) {
    return new CmsTranslateLoader(http, cms, './assets/i18n/', '.json');
}

const translationOptions = {
    loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http, CmsApiService]
    }
};

// Storage (Locker) configurations
// @see https://github.com/MikaAK/angular-safeguard
const storageLockerConfig = {
    driverNamespace: 'ds',
    defaultDriverType: DRIVERS.LOCAL,
    namespaceSeperator: '-'
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [App],
    declarations: [
        App
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        // BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RestangularModule.forRoot(restangularConfigFactory),
        ToastModule.forRoot(),
        NgaModule.forRoot(),
        NgbModule.forRoot(),
        TranslateModule.forRoot(translationOptions), // @See AppTranslationModule for default language setting
        LockerModule.withConfig(storageLockerConfig),
        LaddaModule,
        PagesModule,
        DsSharedModule,
        DsMicroservicesModule,
        routing
    ],
    entryComponents: [
        // DefaultModal,
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS,
        {
            provide: FormioAppConfig,
            useValue: {
                appUrl: 'https://examples.form.io',
                apiUrl: 'https://api.form.io'
            }
        },
        {
            provide: ToastOptions,
            useValue: {
                positionClass: 'toast-bottom-right',
                maxShown: 5,
                newestOnTop: false,
                animate: 'flyRight',
                toastLife: 5000,
                enableHTML: true,
                dismiss: 'auto', // 'auto' | 'click' | 'controlled
                messageClass: 'toast-message',
                titleClass: 'toast-title',
                showCloseButton: true,
            }
        }
    ],
    exports: [TranslateModule],
})

export class AppModule {

    constructor(public appRef: ApplicationRef,
                public appState: AppState) {

        // Add the static app configurations to the app state
        appState.set('config', APP_CONFIG);
    }

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
