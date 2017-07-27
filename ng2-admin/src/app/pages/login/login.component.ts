import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

    public form: FormGroup;
    public username: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    public inProgress: boolean = false;

    constructor(protected router: Router,
                protected fb: FormBuilder,
                protected toastr: ToastsManager,
                protected auth: AuthService) {
        this.form = fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });

        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
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
                            this.router.navigate(['/']);
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
