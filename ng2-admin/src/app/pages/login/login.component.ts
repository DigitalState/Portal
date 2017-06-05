import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { AuthService } from '../../digitalstate/modules/auth/auth.service';
import { Registration } from '../../digitalstate/modules/auth/registration';

import 'style-loader!./login.scss';

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class Login {

    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    public inProgress: boolean = false;

    constructor(protected router: Router,
                protected fb: FormBuilder,
                protected toastr: ToastsManager,
                protected auth: AuthService) {
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values):void {
        this.submitted = true;
        this.inProgress = true;

        if (this.form.valid) {
            this.auth.login(values.email, values.password)
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
