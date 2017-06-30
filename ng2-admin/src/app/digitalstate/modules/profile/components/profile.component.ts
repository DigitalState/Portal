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

@Component({
    selector: 'ds-profile',
    templateUrl: '../templates/profile.template.html',
})
export class DsProfileComponent{

    user: User;
    persona: Persona | any; // Restangularized Entity

    /**
     * Language-change stream subscriber
     */
    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    constructor(protected injector: Injector,
                protected globalState: GlobalState,
                protected translate: TranslateService,
                protected auth: AuthService,
                protected identityApiService: IdentityApiService,
                protected microserviceConfig: MicroserviceConfig,
                protected toastr: ToastsManager) {

        this.user = this.auth.getAuthUser();
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
                console.log(this.persona);
            }
        });

    }

    savePersona() {
        console.log(this.persona);
        this.persona.put().subscribe((response) => {
            this.toastr.success('Entity saved successfully');
        }, (error) => {
            this.toastr.error('Failed to save the entity');
        });
    }

}
