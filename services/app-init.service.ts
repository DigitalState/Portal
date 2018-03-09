import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { WINDOW } from 'ngx-window-token';

import { GlobalState } from '../../global.state';
import { AppState } from '../../app.service';
import { DsEnvironmentConfig } from '../providers/environment.provider';
import { MicroservicesDefinition } from '../../digitalstate/microservices';

import { Observable } from 'rxjs/Observable';

/**
 * The AppInit service performs all the "preloading" of data required prior to launching
 * the app and initializing the main App component. This is achieved through the `load()`
 * method which is used by the app module factory that provides the APP_INITIALIZER token.
 */
@Injectable()
export class AppInitService {


    constructor(protected http: Http,
                protected globalState: GlobalState,
                protected appState: AppState,
                @Inject(WINDOW) protected window,
                protected dsEnv: DsEnvironmentConfig) {

        this.dsEnv.discovery = this.window['discovery'];
    }

    /**
     * Create the app initialization promise.
     * @return {Promise<T>}
     */
    load(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.fetchDiscoveryData().subscribe((discoveryData: any) => {
                this.setDiscoveryData(discoveryData);
                this.globalState.notify('appInit.discovery.complete');
                resolve(true);
            }, (error: DsError) => {
                // Since there is no application component loaded yet,
                // we have to simply show an alert
                if (error.message) {
                    alert(error.message);
                }
                reject(false);
            });
        })
    }

    /**
     * Cache the discovery data in the App State so it can be used by other components and services.
     * @param discoveryData
     */
    setDiscoveryData(discoveryData: any): void {
        this.dsEnv.discovery = discoveryData;
        this.appState.set('discovery', discoveryData);

        let microservices = new MicroservicesDefinition(this.dsEnv).getAll();
        this.appState.set('microservices', microservices);
    }

    /**
     * Fetch data from the Discovery API.
     * @return {Observable<Response>}
     */
    fetchDiscoveryData(): Observable<any> {
        const discoveryHost = 'http://' + this.window.dsDiscoveryHost;
        const headers = this.buildCommonHeaders();
        const options = new RequestOptions({ headers: headers });

        return this.http
            .get(discoveryHost, options)
            .timeout(10000)
            .catch(error => {
                let message = 'Error while fetching discovery data';
                if (error && error.message) {
                    message += ` (${error.message})`;
                }

                console.error(message, error);

                return Observable.throw({
                    message: message,
                    type: 'error'
                } as DsError);
            })
            .map(response => response.json())
            .flatMap(discoveryData => {
                console.log('Discovery data fetched', discoveryData);
                return Observable.of(discoveryData);
            });
    }

    /**
     * Build common headers with optional extra headers passed in `otherHeaders`
     * @param otherHeaders
     * @return {Headers}
     */
    protected buildCommonHeaders(otherHeaders?: { [name: string]: any }): Headers {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });

        if (otherHeaders) {
            Object.keys(otherHeaders).forEach(key => {
                headers.set(key, otherHeaders[key]);
            });
        }

        return headers;
    }
}
