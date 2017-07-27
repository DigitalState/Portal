import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
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
    public email: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;

    public inProgress: boolean = false;

    protected submitted: boolean = false;
    protected registration: Registration;

    constructor(protected router: Router,
                protected fb: FormBuilder,
                protected toastr: ToastsManager,
                protected auth: AuthService) {

        this.registration = new Registration();

        this.form = fb.group({
            'firstName': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'lastName': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
            }, {
                validator: EqualPasswordsValidator.validate('password', 'repeatPassword')
            })
        });

        this.firstName = this.form.controls['firstName'];
        this.lastName = this.form.controls['lastName'];
        this.email = this.form.controls['email'];
        this.passwords = <FormGroup> this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
    }

    public onSubmit(values: Object):void {
        this.submitted = true;
        this.inProgress = true;

        if (this.form.valid) {
            console.log('Registration: ', this.registration);
            this.auth.register(this.registration)
                .finally(() => {
                    this.inProgress = false;
                })
                .subscribe(
                    isSuccess => {
                        if (isSuccess) {
                            this.toastr.success('You have been registered successfully.');
                            this.router.navigate(['/login']);
                        }
                    },
                    errorJson => {
                        // console.error('Registration error response', errorJson)
                        this.toastr.error(errorJson.message);
                    }
                );
        }
    }
}
