import { Component, Injector } from '@angular/core';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';
import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import { AuthService } from '../../../../shared/modules/auth/auth.service';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { User } from '../../../../shared/modules/auth/user';
import { Persona } from '../../../../shared/modules/auth/persona';
import { IdentityUtils } from '../../../../shared/utils/identity.utils';
import { CredentialsVerificationModalComponent } from '../../../../shared/components/modals/credentials-verification-modal/credentials-verification-modal.component';
import { DsPageComponent } from '../../../../shared/components/page-component';

import { EntityApiService, IdentityApiService } from '../entity-api.service';
import { GlobalState } from '../../../../global.state';
import { AppState } from '../../../../app.service';

import { Subscriber } from 'rxjs/Subscriber';
import assign from 'lodash/assign';

@Component({
    selector: 'ds-profile',
    templateUrl: '../templates/profile.template.html',
})
export class DsProfileComponent extends DsPageComponent {

    protected pageTitle = 'general.menu.profile';

    authEndpoint: string;
    credentialsModal: NgbModalRef;

    user: User;
    persona: Persona | any; // Restangularized Entity

    /**
     * Account information that can be updated such as e-mail, password, etc...
     * These are submitted to the endpoint: authentication/users
     */
    userFormData: {
        'email'?: string,
        // 'plainPassword'?: string
    };

    /**
     * Language-change stream subscriber
     */
    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    /*
    * Template variables
    */
    personaSaveInProgress: boolean = false;

    constructor(protected injector: Injector,
                protected globalState: GlobalState,
                protected appState: AppState,
                protected translate: TranslateService,
                protected modal: NgbModal,
                protected auth: AuthService,
                protected identityApiService: IdentityApiService,
                protected microserviceConfig: MicroserviceConfig,
                protected toastr: ToastsManager) {
        super(injector);

        this.user = this.auth.getAuthUser();
        this.userFormData = {
            'email': ''
        };

        this.authEndpoint = this.appState.get('microservices').authentication.paths[this.user.identity.toLowerCase()];
    }

    ngOnInit() {
        super.ngOnInit();
        this.commitBreadcrumb();

        // Subscribe to language-change events
        this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.init();
        });

        // Initialize page
        this.init();
    }

    ngOnDestroy() {
        // Unsubscribe from language-change events
        this.languageChangeSubscriber.unsubscribe();
    }

    init() {
        // Update page title
        setTimeout(() => {
            this.globalState.notifyDataChanged('menu.activeLink', {
                'title': 'general.menu.profile'
            });
        });

        // Fetch actual User object and merge its contents with the one extracted from the token
        this.auth.fetchUser().subscribe(user => {
            if (this.user) {
                this.user.email = user.email;
                this.userFormData.email = this.user.email;
            }
        });

        if (this.user) {
            this.loadPersona();
        }
    }

    loadPersona() {
        // Load persona
        const entityUrlPrefix = IdentityUtils.getPersonaUrlPrefix(this.user.identity);
        const identitySingular = IdentityUtils.getSingular(this.user.identity);
        const requestParams = {};

        requestParams[ identitySingular + '.uuid' ] = this.user.identityUuid;

        // Filter personas by Staff UUID which is the current user's IdentityUuid
        this.identityApiService.resource(entityUrlPrefix).getList(requestParams).subscribe(personas => {
            if (personas.length > 0) {
                this.persona = personas[0];
                this.persona.route += '/' + this.persona.uuid;
                // console.log(this.persona);
            }
        });
    }

    savePersona() {
        this.personaSaveInProgress = true;
        // @Todo Use PATCH instead of PUT to prevent Restangular from sending all properties in PUT request
        // Copy the Restangular Persona object and omit properties that are redundant for the PUT request
        // const outPersona:any = omit(clone(this.persona), ['uuid', 'title']);
        // console.log('this.persona before save', this.persona);
        // console.log('outPersona', outPersona);
        // outPersona.put().subscribe((response) => {

        this.persona.put().subscribe((responsePersona) => {
            // Assign received properties to the current Persona object
            assign(this.persona, responsePersona);
            // console.log('this.persona after save', this.persona);
            this.toastr.success(this.translate.instant('ds.messages.personaSaveSucceeded'));
        }, (error) => {
            this.toastr.error(this.translate.instant('ds.messages.personaSaveFailed'));
        }, () => { // finally
            this.personaSaveInProgress = false;
        });
    }

    /**
     * Save user-related info such as e-mail and password
     * @param password {string} is used to re-issue the auth token
     */
    saveUser(password: any) {
        this.auth.updateUser(this.userFormData).subscribe((response) => {
            this.toastr.success(this.translate.instant('ds.messages.identitySaveSucceeded'));

            // Log the user back in to update the auth token
            this.auth.login(this.authEndpoint, this.user.username, password)
                .finally(() => {

                })
                .subscribe(
                    isSuccess => {
                        if (isSuccess) {
                            this.toastr.success(this.translate.instant('ds.messages.tokenUpdateSucceeded'));
                        }
                    },
                    errorJson => {
                        // console.error('Login error response', errorJson)
                        this.toastr.error(this.translate.instant('ds.messages.tokenUpdateFailed') + ' ' + errorJson.message);
                    }
                );
        }, (error) => {
            this.toastr.error(this.translate.instant('ds.messages.identitySaveFailed'));
        });
    }

    /**
     * Build Credentials Modal and handle its result.
     */
    protected openCredentialsModal() {
        const modalOptions: NgbModalOptions = {
            size: 'sm',
            windowClass: 'credentials-modal',
        };

        this.credentialsModal = this.modal.open(CredentialsVerificationModalComponent, modalOptions);
        this.credentialsModal.componentInstance.authEndpoint = this.authEndpoint;
        this.credentialsModal.componentInstance.username = this.user.username;
        this.credentialsModal.result.then((modalResult) => {
            if (modalResult && modalResult.status === 'success') {
                this.saveUser(modalResult.password);
            }
        }, (modalRejection) => {
            // handle the case where the user naturally exits the modal dialog
        });
    }
}
