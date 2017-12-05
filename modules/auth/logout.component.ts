import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';


@Component({
    template: ''
})
export class LogoutComponent {

    constructor(private router: Router,
                private auth: AuthService) {

    }

    ngOnInit() {
        console.log('Logging out ...');
        this.auth.logout();
    }

}