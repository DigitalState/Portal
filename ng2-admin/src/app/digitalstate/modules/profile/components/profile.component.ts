import { Component, Injector } from '@angular/core';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';

import { GlobalState } from '../../../../global.state';
import { AuthService } from '../../../../shared/modules/auth/auth.service';
import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService, IdentityApiService } from '../entity-api.service';
import { User } from '../../../../shared/modules/auth/user';
import { Persona } from '../../../../shared/modules/auth/persona';

import { Subscriber } from 'rxjs/Subscriber';
import assign from 'lodash/assign';

@Component({
    selector: 'ds-profile',
    templateUrl: '../templates/profile.template.html',
})
export class DsProfileComponent{

    user: User;
    persona: Persona | any; // Restangularized Entity

    /**
     * Account information that can be updated such as e-mail, password, etc...
     * These are submitted to the endpoint: authentication/users
     */
    identityFormData: {
        'email'?: string,
        'plainPassword'?: string
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
                protected translate: TranslateService,
                protected auth: AuthService,
                protected identityApiService: IdentityApiService,
                protected microserviceConfig: MicroserviceConfig,
                protected toastr: ToastsManager) {

        this.user = this.auth.getAuthUser();
        this.identityFormData = {
            'email': this.user.username
        };
    }

    ngOnInit() {
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

        if (this.user) {
            this.loadPersona();
        }
    }

    loadPersona() {
        // Load persona
        const entityUrlPrefix = 'individual-personas';

        // Filter personas by Staff UUID which is the current user's IdentityUuid
        this.identityApiService.resource(entityUrlPrefix).getList({'individual.uuid': this.user.identityUuid}).subscribe(personas => {
            if (personas.length > 0) {
                this.persona = personas[0];
                this.persona.route += '/' + this.persona.uuid;
                console.log(this.persona);
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
            this.toastr.success('Persona information saved successfully');
        }, (error) => {
            this.toastr.error('Failed to save persona information');
        }, () => { // finally
            this.personaSaveInProgress = false;
        });
    }

    /**
     * Save user-related info such as e-mail and password
     */
    saveUser() {
        this.toastr.success('Sample success response!');
        // @todo: This is a stub implementation that has not been tested. Awaiting API requests on Authentication MS to be finalized.
        // this.auth.updateUser(this.identityFormData).subscribe((response) => {
        //     this.toastr.success('Identity information saved successfully');
        // }, (error) => {
        //     this.toastr.error('Failed to save identity information');
        // });
    }

}
