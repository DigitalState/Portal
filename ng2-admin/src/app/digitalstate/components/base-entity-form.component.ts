import { Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { AuthService } from '../../shared/modules/auth/auth.service';
import { DsBaseEntityApiService } from '../../shared/services/base-entity-api.service';
import { MicroserviceConfig } from '../../shared/providers/microservice.provider';
import { LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { DsEntityCrudComponent } from '../../shared/components/base-entity-crud-component';

import 'rxjs/Rx';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';

import clone from 'lodash/clone';
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
     * Translation service
     */
    protected translate: TranslateService;

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
     * Reset the form with a new hero AND restore 'pristine' class state by toggling 'active'
     * flag which causes the form to be removed/re-added in a tick via NgIf
     * TODO: Workaround until NgForm has a reset method (#6822)
     */
    protected active = true;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig) {

        super(injector);
        this.auth = injector.get(AuthService);
    }

    ngOnInit() {
        this.entityMetadata = this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties;
        this.lang = this.translate.currentLang;
        this.formLang = this.translate.currentLang;

        // Subscribe to language-change events
        this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            // this.prepareEntity();
            this.lang = this.translate.currentLang;
        });

        // Setup form errors object with empty messages
        Object.keys(this.entityMetadata).forEach((propertyName) => {
            this.formErrors[propertyName] = '';
        });

        this.prepareEntity().subscribe();
    }

    ngOnDestroy() {
        // Unsubscribe from language-change events
        this.languageChangeSubscriber.unsubscribe();
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {

        return this.route.params.flatMap((params: Params) => {
            let uuid = params['id'];
            let parentUuid = params[this.entityParentUrlParam];

            if (this.isNew) {
                return this.createBlankEntity().flatMap(entity => {
                    this.entity = entity;

                    return this.prepareEntityParent(this.entityParentUrlPrefix, parentUuid).flatMap(entityParent => {
                        return Observable.of({'entity': entity, 'entityParent': entityParent});
                    });
                });
            }
            else {
                return this.entityApiService.getOne(this.entityUrlPrefix, uuid).flatMap(entity => {
                    this.entity = entity;

                    // if (this.headerTitle == null) {
                    //     this.headerTitle = this.entity.uuid;
                    // }

                    return this.prepareEntityParent(this.entityParentUrlPrefix, parentUuid).flatMap(entityParent => {
                        return Observable.of({'entity': entity, 'entityParent': entityParent});
                    });
                });
            }
        });

    }

    protected prepareEntityParent(urlPrefix: string, urlParam: string): Observable<any> {
        if (urlPrefix && urlParam) {
            return this.entityApiService.getOne(urlPrefix, urlParam).flatMap(entityParent => {
                this.entityParent = entityParent;
                this.generateBackLink();
                return Observable.of(entityParent);
            });
        }
        else {
            return Observable.empty();
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
            'owner': user.identity,
            'ownerUuid': user.identityUuid,
            'version': 0,
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
        this.submitted = true;
        if (this.isNew) {
            this.saveNewEntity(form);
        }
        else {
            this.saveExistingEntity(form);
        }
    }

    onValueChanged(data?: any) {
        if (!this.entityForm) {
            return;
        }
        const form = this.entityForm.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const validation = this.entityMetadata[field].validation
                for (const key in control.errors) {
                    let params = validation[key].hasOwnProperty('params') ? validation[key].params : null;
                    let message = this.translate.instant(VALIDATION_TRANS_PREFIX + validation[key].message, params);
                    this.formErrors[field] += message + ' ';
                }
            }
        }
    }

    saveNewEntity(form?: NgForm) {
        console.log('entity', this.entity);
        let sanitizedEntity = this.preSave(clone(this.entity));
        this.entityApiService.resource(this.entityUrlPrefix).post(sanitizedEntity).subscribe((response) => {
            this.onEntitySave(response);
        }, (error) => {
            this.onEntitySaveError(error);
        });
    }

    saveExistingEntity(form: NgForm) {
        let sanitizedEntity = this.preSave(clone(this.entity));
        sanitizedEntity.put().subscribe((response) => {
            this.onEntitySave(response);
        }, (error) => {
            this.onEntitySaveError(error);
        });
    }

    /**
     * Sanitizes the provided `entity` and returns it to the caller.
     * It's best to pass a clone of the original `entity` to avoid data binding issues that me appear in the form.
     *
     * @param entity
     * @returns {any}
     */
    preSave(entity): any {
        // Strip out empty (yet required) language-based properties that may fail validation.
        Object.keys(this.entityMetadata).forEach((propertyName, prop) => {
            let property = this.entityMetadata[propertyName];

            if (property.hasOwnProperty('translated') && property.translated === true) {
                this.translate.langs.forEach((lang) => {
                    if (isString(entity[propertyName][lang]) && isEmpty(entity[propertyName][lang])) {
                        delete entity[propertyName][lang];
                    }
                });
            }
        });
        console.log('sanitized entity', entity);
        return entity;
    }

    onEntitySave(response) {
        console.log('Entity saved successfully, server response: ', response);
        this.toastr.success(this.translate.instant('ds.messages.entitySaveSucceeded'));

        const routerLink = this.isNew ? '../list' : '../show';
        this.router.navigate([routerLink], {relativeTo: this.route});
    }

    onEntitySaveError(error) {
        console.error('There was an error saving entity', error);
        this.toastr.error(this.translate.instant('ds.messages.entitySaveFailed'));
    }
}
