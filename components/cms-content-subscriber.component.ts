import { Injector } from '@angular/core';

import { DsLanguageChangeSubscriber } from './language-change-subscriber.component';

import { AppState } from '../../app.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

/**
 * Components that wish to wait for the initial CMS content can extend this class
 * to receive a notification when such content is loaded in the AppState.
 *
 * This class is created to workaround the issue of content/component loading order
 * where the component is initialized before the CMS content is fetched from the API.
 */
export class DsCmsContentSubscriber extends DsLanguageChangeSubscriber {

    protected appState: AppState;
    protected appContentTimerSubscription: Subscription;

    constructor(injector: Injector) {
        super(injector);
        this.appState = injector.get(AppState);
    }

    ngOnInit() {
        super.ngOnInit();

        // Set vars from CMS content
        let appCmsContent = this.appState.get('appCmsContent');
        if (appCmsContent) {
            this.onAppCmsContent();
        }
        else {
            this.appContentTimerSubscription = Observable.timer(0, 100).subscribe(tick => {
                let appCmsContent = this.appState.get('appCmsContent');
                if (appCmsContent) {
                    this.onAppCmsContent();
                    this.appContentTimerSubscription.unsubscribe();
                }
            });
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();

        if (this.appContentTimerSubscription) {
            this.appContentTimerSubscription.unsubscribe();
        }
    }

    /**
     * For subclasses:
     * This method is called when CMS content is detected in the AppState.
     */
    protected onAppCmsContent() {}
}