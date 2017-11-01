import { Injector } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { AuthService } from '../../shared/modules/auth/auth.service';
import { DsCmsContentSubscriber } from '../../shared/components/cms-content-subscriber.component';

import 'style-loader!./login.scss';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    host: {
        id: 'login',
    }
})
export class Login extends DsCmsContentSubscriber {

    form: FormGroup;
    username: AbstractControl;
    password: AbstractControl;
    authEndpoint: string;
    redirectUrl: string;

    submitted: boolean = false;
    inProgress: boolean = false;

    protected formTitle: string = 'login.title'; // Translation key
    protected appTitle: any; // Translation Object

    protected router: Router;
    protected route: ActivatedRoute;
    protected fb: FormBuilder;
    protected toastr: ToastsManager;
    protected auth: AuthService;
    protected translate: TranslateService;

    constructor(protected injector: Injector) {
        super(injector);

        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.fb = injector.get(FormBuilder);
        this.toastr = injector.get(ToastsManager);
        this.auth = injector.get(AuthService);
        this.translate = injector.get(TranslateService);

        this.form = this.fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });

        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];

        // Initialize the Authentication endpoint
        this.authEndpoint = this.appState.get('microservices').authentication.paths.individual;

        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((navStartEvent: NavigationStart) => {
                if (!navStartEvent.url.startsWith('/login')) {
                    console.log('NavigationStart URL:', navStartEvent.url);
                    this.redirectUrl = navStartEvent.url;
                }
            });
    }

    ngOnInit() {
        super.ngOnInit();

        // get redirect url from route parameters or default to '/'
        this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
        console.log('Redirect URL', this.redirectUrl);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    protected onAppCmsContent() {
        console.log('appCmsContent: ', this.appState.get('appCmsContent'));
        this.appTitle = this.appState.get('appCmsContent', {})['texts']['portal-title'];
    }

    onSubmit(values):void {
        this.submitted = true;
        this.inProgress = true;

        if (this.form.valid) {
            this.auth.login(this.authEndpoint, values.username, values.password)
                .finally(() => {
                    this.inProgress = false;
                })
                .subscribe(
                    isSuccess => {
                        if (isSuccess) {
                            this.toastr.success(this.translate.instant('ds.messages.loginSucceeded'));
                            this.router.navigateByUrl(this.redirectUrl);
                        }
                    },
                    errorJson => {
                        // console.error('Login error response', errorJson)
                        this.toastr.error(this.translate.instant('ds.messages.loginFailed') + ' ' + errorJson.message);
                    }
                );
        }
    }
}
