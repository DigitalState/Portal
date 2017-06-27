import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';

import { tokenNotExpired, AuthHttp, JwtHelper } from 'angular2-jwt';

import { AppState } from '../../../app.service';
import { Registration } from './registration';
import { User } from './user';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

    protected authUrlPrefix;
    protected jwtHelper: JwtHelper;
    protected authUser;

    constructor(protected appState: AppState,
                protected router: Router,
                protected http: Http,
                protected authHttp: AuthHttp) {

        this.authUrlPrefix = appState.get('microservices').authentication.entrypoint.url;
        this.jwtHelper = new JwtHelper();

        // Initialize authUser if a valid token exists
        const token = this.getToken();
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            const decodedToken = this.decodeToken(token);
            this.createAuthUser(decodedToken);
        }
    }

    getAuthUser(): User {
        if (this.authUser == null) {
            const token = this.getToken();
            const decodedToken = this.decodeToken(token);
            this.createAuthUser(decodedToken);
        }

        return this.authUser;
    }

    getToken() {
        // @todo: change this to the real token
        // const testToken = 'eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0lORElWSURVQUwiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ1c2VyQGRzIiwiaXAiOiI6OjEiLCJjbGkiOiI0YzZjMGRhMyIsImlkZW4iOiJJbmRpdmlkdWFsIiwiaWRlbl91dWlkIjoiYzc1MDhlMDgtNWVhZC00MjhiLTgwMjItYTI1MzNlMDBhZGVkIiwiaWF0IjoxNDk2MTYwOTY1LCJleHAiOjE0OTYyNDczNjV9.BL0lk4R2C5qkFPAmIE2THggk27nQI_WZwCDBuhmnjpsZtVq0x4YtLWFO6-_ehGW1g42NAknSondx7D3KAj6wnKsTTZpPUw4NoOJOeUXQlxXeTenqNCjczEW7QOuZeXsz5KLrAYHN1V5YgXk0r6KfNldvp_b4KpTKxalldq7IO3uaO8Iv4C-cWMnnFb1XeSJLtyo5xqL5T4T7EJrH7avYD74zPpQ_5n3o7KnErcK1phc3LSMsxqVPtayzhfxU-GnQbSI1ZTT5KYR30h_Xcc1ja_xKLlClBDalSH9-1wz3eq66vjBwsSgKeA-E7lEOh_01J2vtyZBOgX8qFvIDIGKFM7i2L8UEW6H38lMj7T7ZP-IEpb_MOxwZmmhBXFtaxJEchcG4wcdGTEB6P6oswHLpmrz9aZHHkKji2IEiOaQCGhurt_ea_VBdDfH4qOQQcQOd-34s0gVpQ8evpSXF9tReKMxapntH2-e3MN55Otjobj4JzYlw0VoDwEoIUDBZ2Nh-_yY5zswfGgdAGAVwdETnRmnJm0KxD0dKblbmUvSpEdjs0bMK5ZNvxrTbOuqvy53yUZcN01smsRe1GGIYJLLPJK8BPbbYr3144jBmV2cFxXTo-3HivEDW-kv0nl5DKlHwS5VycTEQOHa1ovLyp_0zHCZ45RvdvUQy3sDh6tTmf8U';
        const tokenName = this.appState.get('jwtTokenName');
        return localStorage.getItem(tokenName);
    }

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
        let url = this.authUrlPrefix + 'registration';
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = new URLSearchParams();
        body.set('username', registration.email);
        body.set('password', registration.password);

        return this.http.post(url, body.toString(), options)
            .map((response: Response) => response.ok)
            .catch((response: Response) => Observable.throw(response.json()));
    }

    /**
     * Submit a login request and update the user session if successful.
     *
     * @param email
     * @param password
     * @return Observable
     */
    login(email: string, password: string) {
        let url = this.authUrlPrefix + 'security-check';
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
            .catch((response: Response) => Observable.throw(response.json()));
    }

    isLoggedIn() {
        return tokenNotExpired();
    }

    logout() {
        const tokenName = this.appState.get('jwtTokenName');
        localStorage.removeItem(tokenName);
        this.authUser = null;
        this.router.navigate(['/login']);
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
        this.authUser = new User;
        this.authUser.username = decodedToken['username'];
        this.authUser.identity = decodedToken['identity'];
        this.authUser.identityUuid = decodedToken['identityUuid'];
        this.authUser.roles = decodedToken['roles'];
    }

}
