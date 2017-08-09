import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { AuthService } from '../../shared/modules/auth/auth.service';
import { Registration } from '../../shared/modules/auth/registration';

import 'style-loader!./login.scss';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    host: {
        id: 'login',
    }
})
export class Login {

    form: FormGroup;
    username: AbstractControl;
    password: AbstractControl;
    redirectUrl: string;

    submitted: boolean = false;
    inProgress: boolean = false;

    constructor(protected router: Router,
                protected route: ActivatedRoute,
                protected fb: FormBuilder,
                protected toastr: ToastsManager,
                protected auth: AuthService) {
        this.form = fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });

        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];

        console.log('ActivatedRoute: ', router.url);
        router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((navStartEvent: NavigationStart) => {
                if (!navStartEvent.url.startsWith('/login')) {
                    console.log('NavigationStart URL:', navStartEvent.url);
                    this.redirectUrl = navStartEvent.url;
                }
            });
    }

    ngOnInit() {
        // get redirect url from route parameters or default to '/'
        this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
        console.log('Redirect URL', this.redirectUrl);
    }

    public onSubmit(values):void {
        this.submitted = true;
        this.inProgress = true;

        if (this.form.valid) {
            this.auth.login(values.username, values.password)
                .finally(() => {
                    this.inProgress = false;
                })
                .subscribe(
                    isSuccess => {
                        if (isSuccess) {
                            this.toastr.success('You have been successfully signed in.');
                            this.router.navigateByUrl(this.redirectUrl);
                        }
                    },
                    errorJson => {
                        // console.error('Login error response', errorJson)
                        this.toastr.error(errorJson.message);
                    }
                );
        }
    }
}
