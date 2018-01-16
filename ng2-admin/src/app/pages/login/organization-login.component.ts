import { Injector } from '@angular/core';
import { Component } from '@angular/core';

import { Login } from './login.component';

import 'style-loader!./login.scss';

@Component({
    selector: 'organization-login',
    templateUrl: './login.html',
    host: {
        id: 'login',
        class: 'organization-login'
    }
})
export class OrganizationLogin extends Login {

    protected formTitle: string = 'login.organizationFormTitle'; // Translation key

    constructor(protected injector: Injector) {
        super(injector);

        // Initialize the Authentication endpoint
        this.authEndpoint = this.appState.get('microservices').authentication.paths.organization;
    }

}
