import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { tokenNotExpired, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Locker } from 'angular-safeguard';
import { WINDOW } from 'ngx-window-token';

import { AppState } from '../../../app.service';
import { GlobalState } from '../../../global.state';
import { Registration } from './registration';
import { User } from './user';
import { IdentityUtils } from '../../utils/identity.utils';

import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import isEmpty from 'lodash/isEmpty';


@Injectable()
export class AuthService {

    protected authUrlPrefix;
    protected registrationPath;
    // protected loginPath;
    protected anonymousPath;
    protected jwtHelper: JwtHelper;
    protected authUser;

    protected anonymousToken: string;
    protected anonymousTokenSubject: Subject<string>;

    constructor(protected appState: AppState,
                protected globalState: GlobalState,
                protected router: Router,
                protected location: Location,
                protected http: Http,
                protected authHttp: AuthHttp,
                protected locker: Locker,
                @Inject(WINDOW) protected window) {

        // console.log('AuthService registering retrospectively for `appInit.discovery.complete`');
        globalState.subscribeRetro('appInit.discovery.complete', (eventData) => {
            // console.log('AuthService received `appInit.discovery.complete`', eventData);
            this.init();
        });
    }

    init(): void {
        const config = this.appState.get('microservices').authentication;
        this.authUrlPrefix = config.entrypoint.url;
        this.registrationPath = this.authUrlPrefix + config.paths.registration;
        this.anonymousPath = this.authUrlPrefix + config.paths.anonymous;
        // this.loginPath = this.authUrlPrefix + config.paths.login;
        this.jwtHelper = new JwtHelper();

        // Initialize authUser if a valid token exists
        const token = this.getToken();
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            const decodedToken = this.decodeToken(token);
            this.createAuthUser(decodedToken);
        }

        // Initialize the anonymous token subject with an empty value
        this.anonymousTokenSubject = new Subject();
        this.loadAnonymousToken().subscribe(() => {
            this.globalState.notify('auth.token.anonymous.loaded');
        }, error => {
            this.globalState.notify('global.notification', error);
        });
    }

    /**
     * Request an anonymous token from the Authentication microservice.
     * @return {Observable<R>} An observable of the loaded token or an error object.
     */
    loadAnonymousToken(): Observable<string | DsError> {
        let url = this.anonymousPath;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, '', options)
            .timeout(10000)
            .catch(error => {
                let message = 'Error while requesting anonymous token';
                if (error && error.message) {
                    message += ` (${error.message})`;
                }

                console.error(message, error);

                return Observable.throw({
                    message: message,
                    type: 'error'
                } as DsError);
            })
            .flatMap((response: Response) => {
                this.anonymousToken = response.json().token;
                this.anonymousTokenSubject.next(this.anonymousToken);
                this.anonymousTokenSubject.complete();
                return Observable.of(this.anonymousToken);
            });
    }

    /**
     * Returns the anonymous token wrapped in an observable if already loaded,
     * otherwise, returns an observable of the token subject which can be used
     * to wait for the token to be loaded.
     * @return {Observable<string>}
     */
    getAnonymousToken(): Observable<string> {
        if (this.anonymousToken) {
            return Observable.of(this.anonymousToken);
        }
        else {
            return this.anonymousTokenSubject.asObservable();
        }
    }

    /**
     * Gets the current User object or creates one based on the contents of the JWT token.
     * @return {User}
     */
    getAuthUser(): User {
        if (this.authUser == null) {
            const token = this.getToken();
            const decodedToken = this.decodeToken(token);
            this.createAuthUser(decodedToken);
        }

        return this.authUser;
    }

    /**
     * Gets the JWT token from local data store.
     * @return {string|null}
     */
    getToken(): string | null {
        const tokenName = this.appState.get('jwtTokenName');
        return localStorage.getItem(tokenName);
    }

    /**
     * @deprecated
     * @return {any}
     */
    getDecodedToken() {
        return this.jwtHelper.decodeToken(this.getToken());
    }

    /**
     * Submit a registration request to create a new user.
     *
     * @param registration
     * @return Observable
     */
    register(registration: Registration) {
        let url = this.registrationPath;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.anonymousToken
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, registration, options)
            .map((response: Response) => response.ok)
            .catch((response: Response) => Observable.throw(response.json()));
    }

    /**
     * Submit a login request and update the user session if successful.
     *
     * @param relativeAuthUrl A relative URL to the authentication endpoint (e.g: `tokens/individual`)
     * @param email
     * @param password
     * @return Observable
     */
    login(relativeAuthUrl: string, email: string, password: string): Observable<any> {
        let url = this.authUrlPrefix + relativeAuthUrl;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = new URLSearchParams();
        body.set('username', email);
        body.set('password', password);

        return this.http.post(url, body.toString(), options)
            .map((response: Response) => {
                // this.appState.set('token', response.json().token);
                this.saveToken(response.json().token);
                return response.ok;
            })
            .flatMap((isSuccess) => {
                if (isSuccess) {
                    return this.fetchUserExtra();
                }
                else {
                    throw 'login error: initial token request failed';
                }
            })
            .catch((response: Response) => Observable.throw(response.json()));
    }

    /**
     * Submit a login request to simply verify whether the email/password combination is valid.
     *
     * @param relativeAuthUrl A relative URL to the authentication endpoint (e.g: `tokens/individual`)
     * @param email
     * @param password
     * @return Observable
     */
    loginVerify(relativeAuthUrl: string, email: string, password: string): Observable<any> {
        let url = this.authUrlPrefix + relativeAuthUrl;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = new URLSearchParams();
        body.set('username', email);
        body.set('password', password);

        return this.http.post(url, body.toString(), options)
            .flatMap(response => {
                if (response && response instanceof Response && response.ok) {
                    return Observable.of(response.json());
                }
                else {
                    return Observable.of(null);
                }
            })
            .catch((response: Response) => Observable.throw(response.json()));
    }

    /**
     * uuid {String}: User UUID
     * @returns {Observable<R|T>}
     */
    fetchUser(uuid?: string): Observable<User> {
        if (!uuid && this.authUser) {
            uuid = this.authUser.uuid;
        }

        let url = this.authUrlPrefix + 'users/' + uuid;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.getToken()
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(url, options)
            .map((response: Response) => {
                if (response.ok) {
                    const responseJson = response.json();
                    let tmpUser = new User;
                    tmpUser.uuid = responseJson['uuid'];
                    tmpUser.username = responseJson['username'];
                    tmpUser.email = responseJson['email'];
                    tmpUser.identity = responseJson['identity'];
                    tmpUser.identityUuid = responseJson['identityUuid'];
                    tmpUser.roles = responseJson['roles'];
                    return tmpUser;
                }
                else {
                    Observable.throw(response.json());
                }
            })
            .catch((response: Response) => Observable.throw(response.json()));
    }

    /**
     *
     * @returns {Observable<R|T>}
     */
    fetchUserExtra(): Observable<boolean> {
        // Load the user's Identity info
        const identitiesUrlPrefix = this.appState.get('microservices').identities.entrypoint.url;
        let user = this.getAuthUser();

        if (user) {
            let userIdentityUrlPrefix = IdentityUtils.getIdentityUrlPrefix(user.identity);
            let url = identitiesUrlPrefix + userIdentityUrlPrefix + '/' + user.identityUuid;
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.getToken()
            });
            let options = new RequestOptions({ headers: headers });

            return this.http.get(url, options)
                .map((response: Response) => {
                    if (response.ok) {
                        // @Fixme Refactor this to have it append data in case `user` property is already set in locker
                        this.saveUserExtra(response.json());
                    }
                    return response.ok;
                })
                .catch((response: Response) => Observable.throw(response.json()));
        }
        else {
            throw 'loadUserExtra error: no authorized user is defined';
        }
    }

    /**
     * Updates the user account information including e-mail address and password.
     * @param userData Object containing account info to be updated.
     */
    updateUser(userData: any) {
        let url = this.authUrlPrefix + 'users/' + this.authUser.uuid;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = userData;

        return this.authHttp.put(url, body, options)
            .catch((response: Response) => Observable.throw(response.json()));
    }

    isLoggedIn() {
        return tokenNotExpired();
    }

    logout() {
        const tokenName = this.appState.get('jwtTokenName');
        localStorage.removeItem(tokenName);
        this.authUser = null;
        this.locker.remove('user-extra');
        // this.router.navigate(['/login'], { queryParams: { redirectUrl: '/' }});
        this.location.go('/login');
        window.location.reload(true);
    }

    protected saveToken(token: string) {
        const tokenName = this.appState.get('jwtTokenName');
        localStorage.setItem(tokenName, token);

        const decodedToken = this.decodeToken(token);
        this.createAuthUser(decodedToken);
    }

    protected decodeToken(token: string): object {
        return this.jwtHelper.decodeToken(token);
    }

    protected createAuthUser(decodedToken: object) {
        console.log('decodedToken: ', decodedToken);
        this.authUser = new User;
        this.authUser.uuid = decodedToken['uuid'];
        this.authUser.username = decodedToken['username'];
        this.authUser.identity = decodedToken['identity'];
        this.authUser.identityUuid = decodedToken['identityUuid'];
        this.authUser.roles = decodedToken['roles'];

        // Attempt to load the user extra props from storage
        if (isEmpty(this.authUser.extra)) {
            this.loadUserExtra();
        }
    }

    protected loadUserExtra() {
        if (this.locker.has('user-extra')) {
            let userExtra = this.locker.get('user-extra');
            this.authUser.extra = userExtra;
        }
    }

    protected saveUserExtra(userExtra: any) {
        this.locker.set('user-extra', userExtra);

        if (this.authUser) {
            this.authUser.extra = userExtra;
        }
    }

    // protected buildCommonHeaders(otherHeaders?: { [name: string]: any }): Headers {
    //     let headers = new Headers({
    //         'Content-Type': 'application/json'
    //     });
    //
    //     if (otherHeaders) {
    //         forEach(otherHeaders, (value, key) => {
    //             headers.set(key, value);
    //         });
    //     }
    //
    //     return headers;
    // }

}
