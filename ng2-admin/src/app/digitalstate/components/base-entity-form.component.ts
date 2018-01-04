import { AfterViewInit, Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { CustomValidators } from 'ng2-validation';

import { DsStaticTranslationService } from '../../shared/services/static-translation.service';
import { AuthService } from '../../shared/modules/auth/auth.service';
import { DsBaseEntityApiService } from '../../shared/services/base-entity-api.service';
import { MicroserviceConfig } from '../../shared/providers/microservice.provider';
import { LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { DsEntityCrudComponent } from '../../shared/components/base-entity-crud-component';

import 'rxjs/Rx';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';

import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';


const VALIDATION_TRANS_PREFIX = 'ds.microservices.entity.validation.';

export abstract class DsBaseEntityFormComponent extends DsEntityCrudComponent {

    entityForm: NgForm;
    currentForm: NgForm;

    entity: any;
    entityParent: any;
    headerTitle: string = '';
    headerSubtitle: string = '';

    /**
     * Whether or not the entity is considered new. This is normally used to determine if the form is used to create or
     * edit an existing entity.
     */
    isNew: boolean;

    protected submitted: boolean = false;
    protected formErrors = {};

    /**
     * The URL portion of the REST resource URL that refers to the entity's collection.
     * @type {string}
     */
    protected entityUrlPrefix: string;

    /**
     * The entity's identifier.
     */
    protected id: any;

    /**
     * A shortcut to the entity's metadata from the MicroserviceConfig.
     * This is basically the object keyed as `properties` under the entity
     * settings.
     */
    protected entityMetadata = {};

    /**
     * The Enity API service is not injected into this base component class because
     * the API service configurations are Microservice-specific.
     */
    protected entityApiService: DsBaseEntityApiService<any>;

    /**
     * Translation services
     */
    protected translate: TranslateService;
    protected staticTranslate: DsStaticTranslationService

    /**
     * Auth service
     */
    protected auth: AuthService;

    /**
     * Language-change stream subscriber
     */
    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    /**
     * Alias for the current interface language. Ex: `en`, `fr`, ec...
     */
    protected lang: string;

    /**
     * Alias for the current form language. Ex: `en`, `fr`, ec...
     */
    protected formLang: string;

    /**
     * Reset the form with a new entity AND restore 'pristine' class state by toggling 'active'
     * flag which causes the form to be removed/re-added in a tick via NgIf
     * TODO: Workaround until NgForm has a reset method (#6822)
     */
    protected active = true;

    /**
     * Set when route params are available
     */
    protected routeParams: Params;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig) {

        super(injector);
        this.auth = injector.get(AuthService);
        this.staticTranslate = injector.get(DsStaticTranslationService);
    }

    ngOnInit() {
        super.ngOnInit();

        this.loadEntityMetaData();
        this.lang = this.translate.currentLang;

        // Subscribe to language-change events
        this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            // this.prepareEntity();
            this.lang = this.translate.currentLang;
            this.updateTranslations(event.lang);

            // For entities that have parent UUIDs in the URL, generate the back-link when UI language changes
            this.prepareEntityParent();
        });

        // Subscribe to current translation to make sure formLang is sent only when translations are ready
        this.translate.getTranslation(this.translate.currentLang).subscribe(() => {
            this.formLang = this.translate.currentLang;
        });

        // Setup form errors object with empty messages
        Object.keys(this.entityMetadata).forEach((propertyName) => {
            this.formErrors[propertyName] = '';
        });

        this.prepareEntity().subscribe();
    }

    ngOnDestroy() {
        // Unsubscribe from language-change events
        if (this.languageChangeSubscriber) {
            this.languageChangeSubscriber.unsubscribe();
        }
    }

    /**
     * Override this method to manipulate the entity meta-data that is loaded from `microservices.ts`.
     */
    protected loadEntityMetaData(): void {
        this.entityMetadata = this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties;
    }

    protected onRouteParams(params: Params) {
        this.routeParams = params;
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {

        return this.route.params.flatMap((params: Params) => {
            let uuid = params['id'];
            let parentUuid = params[this.entityParentUrlParam];

            this.onRouteParams(params);

            if (this.isNew) {
                return this.createBlankEntity().flatMap(entity => {
                    this.entity = entity;
                    this.onEntityPrepared();

                    return this.prepareEntityParent(this.entityParentUrlPrefix, parentUuid).flatMap(entityParent => {
                        return Observable.of({'entity': entity, 'entityParent': entityParent});
                    });
                });
            }
            else {
                return this.entityApiService.getOne(this.entityUrlPrefix, uuid).flatMap(entity => {
                    this.entity = entity;
                    this.onEntityPrepared();

                    return this.prepareEntityParent(this.entityParentUrlPrefix, parentUuid).flatMap(entityParent => {
                        return Observable.of({'entity': entity, 'entityParent': entityParent});
                    });
                });
            }
        });

    }

    protected prepareEntityParent(urlPrefix?: string, urlParam?: string): Observable<any> {
        if (this.entityParent) {
            this.generateBackLink();
            return Observable.of(this.entityParent);
        }
        else if (urlPrefix && urlParam) {
            return this.entityApiService.getOne(urlPrefix, urlParam).flatMap(entityParent => {
                this.entityParent = entityParent;
                this.generateBackLink();
                return Observable.of(entityParent);
            });
        }
        else {
            return Observable.of(null);
        }
    }

    /**
     * Build a skeleton of an entity with all properties from its metadata.
     * Subclasses can override this method to customize the resulting entity.
     */
    protected createBlankEntity(): Observable<any> {
        // Create an entity with default properties that are not part of the entity's meta-model.
        let user = this.auth.getAuthUser();
        let entity = {
            // 'owner': user.identity,
            // 'ownerUuid': user.identityUuid,
            'owner': 'BusinessUnit',
            'ownerUuid': '8454c987-cbc5-4a24-ba1a-d420283caabd',
            'weight': 0,
            'version': 1,
        };

        Object.keys(this.entityMetadata).forEach((propertyName, prop) => {
            let property = this.entityMetadata[propertyName];
            let defaultValue = property.hasOwnProperty('default') ? property.default : '';

            // Determine whether to populate the property as a translated value
            if (property.hasOwnProperty('translated') && property.translated === true) {
                entity[propertyName] = {};
                this.translate.langs.forEach((lang) => {
                    entity[propertyName][lang] = defaultValue;
                });
            }
            else {
                entity[propertyName] = defaultValue;
            }
        });

        return Observable.of(entity);
    }

    /**
     * Stub called when the entity is fetched.
     */
    onEntityPrepared() {
        if (this.pageTitle !== '' && !this.isNew && this.entity && this.entity.title) {
            // If title is translated, show it in current language
            if (this.entity.title.hasOwnProperty(this.translate.currentLang) && this.entity.title[this.translate.currentLang].length > 0) {
                this.pageTitle = this.entity.title[this.translate.currentLang];
            }
            else {
                this.pageTitle = this.entity.title;
            }
        }
    }


    /**
     * Override this in subclasses to receive interface translation updates.
     * @param lang Language key
     */
    protected updateTranslations(lang: string): void {
        this.onEntityPrepared();

        // Update the BackLink translation
        // if (this.entityParent) {
        //     this.generateBackLink();
        // }
    }

    displayFormErrors(checkCleanControls: boolean = true) {
        if (!this.entityForm) {
            return;
        }

        const form = this.entityForm.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && (control.dirty || checkCleanControls) && !control.valid) {
                // const validation = this.entityMetadata[field].validation
                for (const key in control.errors) {
                    this.setFormError(field, key);
                    // let params = validation[key].hasOwnProperty('params') ? validation[key].params : null;
                    // let message = this.translate.instant(VALIDATION_TRANS_PREFIX + validation[key].message, params);
                    // this.formErrors[field] += message + ' ';
                }
            }
        }
    }

    onFormInit(form: NgForm) {
        this.currentForm = form;
    }

    onFormChange(form: NgForm) {
        if (this.currentForm === this.entityForm) {
            return;
        }

        this.entityForm = this.currentForm;
        if (this.entityForm) {
            this.entityForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onFormCancel() {
        this.location.back();
    }

    onFormLanguageChange(newLanguage: { key: string, name: string }) {
        this.formLang = newLanguage.key;
    }

    onFormSubmit(form: NgForm) {
        if (!form.valid) {
            this.displayFormErrors();
            this.toastr.error(this.translate.instant('ds.messages.formInvalid'));
            return false;
        }

        this.submitted = true;
        if (this.isNew) {
            this.saveNewEntity(form);
        }
        else {
            this.saveExistingEntity(form);
        }
    }

    onValueChanged(data?: any) {
        // Validate form controls while ignoring clean controls
        this.displayFormErrors(false);
    }

    saveNewEntity(form?: NgForm) {
        try {
            let sanitizedEntity = this.preSave(cloneDeep(this.entity));
            this.entityApiService.resource(this.entityUrlPrefix).post(sanitizedEntity).subscribe((response) => {
                this.onEntitySave(response);
            }, (error) => {
                this.onEntitySaveError(error);
            });
        }
        catch (e) {
            console.warn('Error in saveNewEntity', e);
        }
    }

    saveExistingEntity(form: NgForm) {
        try {
            let plainEntity = cloneDeep(this.entity.plain());
            let sanitizedEntity = this.preSave(plainEntity);
            let resource = this.entityApiService.resource(this.entityUrlPrefix);
            let headers = { 'Content-Type': 'application/json' };

            resource.customPUT(sanitizedEntity, this.entity.uuid, undefined, headers).subscribe((response) => {
                this.onEntitySave(response);
            }, (error) => {
                this.onEntitySaveError(error);
            });
        }
        catch (e) {
            console.warn('Error in saveExistingEntity', e);
        }
    }

    /**
     * Sanitizes the provided `entity` and returns it to the caller.
     * It's best to pass a clone of the original `entity` to avoid data binding issues that me appear in the form.
     *
     * @param entity
     * @returns {any}
     */
    preSave(entity): any {
        const propertiesToRemove = this.getPropertiesToRemoveOnSave();
        entity = omit(entity, propertiesToRemove);
        // Remove property if it's read only
        // propertiesToRemove.forEach((propertyName) => {
        //     if (entity.hasOwnProperty(propertyName)) {
        //         delete entity[propertyName];
        //     }
        // });

        // Strip out empty (yet required) language-based properties that may fail validation.
        Object.keys(this.entityMetadata).forEach((propertyName, prop) => {
            let property = this.entityMetadata[propertyName];

            // Skip read-only properties
            if (propertiesToRemove.indexOf(propertyName) > -1) {
                return;
            }

            if (property.hasOwnProperty('translated') && property.translated === true) {
                this.translate.langs.forEach((lang) => {
                    if (entity[propertyName] && isString(entity[propertyName][lang]) && isEmpty(entity[propertyName][lang])) {
                        delete entity[propertyName][lang];
                    }

                    // Convert JSON properties from strings to JSON objects
                    if (property.hasOwnProperty('type') && property.type === 'json') {
                        try {
                            if (isString(entity[propertyName][lang])) {
                                if (entity[propertyName][lang].trim().length === 0) {
                                    entity[propertyName][lang] = '{}';
                                }
                                entity[propertyName][lang] = JSON.parse(entity[propertyName][lang]);
                            }
                        }
                        catch (e) {
                            this.setFormError(propertyName, 'json');
                            throw {
                                'type': 'validation',
                                'property': propertyName,
                                'field': property.type,
                                'language': lang
                            };
                        }
                    }
                });
            }
            else {
                // Convert JSON properties from strings to JSON objects
                if (isString(entity[propertyName]) && property.hasOwnProperty('type') && property.type === 'json') {
                    entity[propertyName] = JSON.parse(entity[propertyName]);
                }
            }
        });

        console.log('sanitized entity', entity);
        return entity;
    }

    /**
     * This method is called prior to saving an entity to get a list of properties to omit. Subclasses can override
     * but make sure to call the super method first.
     *
     * @returns Array<string>
     */
    getPropertiesToRemoveOnSave(): Array<string> {
        return [
            '@context',
            '@id',
            '@type',
            'id',
            'uuid',
            'createdAt',
            'updatedAt',
            'deletedAt',
        ];
    }

    setFormError(propertyName, validationKey) {
        const validation = this.entityMetadata[propertyName].validation;
        let params = validation[validationKey].hasOwnProperty('params') ? validation[validationKey].params : null;
        let translationKey = VALIDATION_TRANS_PREFIX + validation[validationKey].message;
        let message = this.staticTranslate.instant(this.formLang, translationKey, params);
        this.formErrors[propertyName] += message + ' ';
    }

    getRoutingUrlOnSave(response: any): Array<any> {
        let relativeUrl = this.isNew ? '../' + response.uuid : '../';
        return [relativeUrl, 'show'];
    }

    onEntitySave(response) {
        console.log('Entity saved successfully, server response: ', response);
        this.toastr.success(this.translate.instant('ds.messages.entitySaveSucceeded'));

        // const routerLink = this.isNew ? '../list' : '../show';
        if (response.uuid) {
            let routingUrl = this.getRoutingUrlOnSave(response);
            this.router.navigate(routingUrl, { relativeTo: this.route });
        }
        else {
            this.toastr.error(this.translate.instant('ds.messages.unexpectedError'));
        }
    }

    onEntitySaveError(error: any) {
        console.error('There was an error saving entity', error);
        let errorTitle = this.translate.instant('ds.messages.entitySaveFailed');
        let errorMessage = '';

        if (error.data && error.data['hydra:description']) {
            errorMessage = error.data['hydra:description'];
            // setTimeout(() => {
            //     this.toastr.info(this.translate.instant('ds.messages.ensureFormValid'));
            // }, 500);
        }

        this.toastr.error(errorMessage, errorTitle);
    }
}
