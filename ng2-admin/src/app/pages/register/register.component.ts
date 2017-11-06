import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { EqualPasswordsValidator } from '../../theme/validators';
import { AuthService } from '../../shared/modules/auth/auth.service';
import { Registration } from '../../shared/modules/auth/registration';

import 'style-loader!./register.scss';

@Component({
    selector: 'register',
    templateUrl: './register.html',
    host: {
        id: 'register',
    }
})
export class Register {

    public form: FormGroup;
    public firstName: AbstractControl;
    public lastName: AbstractControl;
    public username: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;
    public isOrganization: AbstractControl;

    public inProgress: boolean = false;

    protected submitted: boolean = false;
    protected registration: Registration;

    constructor(protected router: Router,
                protected fb: FormBuilder,
                protected toastr: ToastsManager,
                protected auth: AuthService,
                protected translate: TranslateService) {

        this.registration = new Registration();

        this.form = fb.group({
            'firstName': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'lastName': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            // 'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'username': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
            }, {
                validator: EqualPasswordsValidator.validate('password', 'repeatPassword')
            }),
            'isOrganization': [false]
        });

        this.firstName = this.form.controls['firstName'];
        this.lastName = this.form.controls['lastName'];
        this.username = this.form.controls['username'];
        this.passwords = <FormGroup> this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
        this.isOrganization = this.form.controls['isOrganization'];
    }

    public onSubmit(values: any):void {
        this.submitted = true;
        this.inProgress = true;

        // Update identity on the registration model
        this.registration.identity = values.isOrganization ? 'Organization' : 'Individual';

        // console.log(values);
        // console.log(this.registration);
        // return;

        if (this.form.valid) {
            console.log('Registration: ', this.registration);
            this.auth.register(this.registration)
                .finally(() => {
                    this.inProgress = false;
                })
                .subscribe(
                    isSuccess => {
                        if (isSuccess) {
                            this.toastr.success(this.translate.instant('ds.messages.registrationSucceeded'));
                            this.router.navigate(['/login']);
                        }
                    },
                    errorJson => {
                        // console.error('Registration error response', errorJson)
                        this.toastr.error(this.translate.instant('ds.messages.registrationFailed') + ' ' + errorJson.message);
                    }
                );
        }
    }
}
