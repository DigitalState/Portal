import {Injector, Input} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { AuthService } from '../modules/auth/auth.service';
import { DsBaseEntityApiService } from '../services/base-entity-api.service';
import { MicroserviceConfig } from '../modules/microservice.provider';
import { LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { DsEntityCrudComponent } from './base-entity-crud-component';

import 'rxjs/Rx';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';


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
                protected route: ActivatedRoute,
                protected router: Router,
                protected location: Location,
                protected microserviceConfig: MicroserviceConfig,
                protected toastr: ToastsManager) {

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

    // protected XprepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
    //     return this.route.params.flatMap((params: Params) => {
    //         let uuid = params['id'];
    //
    //         return this.entityApiService.getOne(this.entityUrlPrefix, uuid).flatMap(entityResult => {
    //             this.entity = entityResult;
    //
    //             // if (this.headerTitle == null) {
    //             //     this.headerTitle = this.entity.uuid;
    //             // }
    //
    //             if (this.entityParentUrlPrefix && this.entityParentUrlParam) {
    //                 return this.entityApiService.getOne(this.entityParentUrlPrefix, params[this.entityParentUrlParam]).flatMap(entityParentResult => {
    //                     this.entityParent = entityParentResult;
    //                     this.generateBackLink();
    //                     return Observable.of({'entity': this.entity, 'entityParent': this.entityParent});
    //                 });
    //             }
    //
    //             return Observable.of({'entity': this.entity});
    //         });
    //     });
    // }

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

    // protected prepareEntity() {
    //     if (this.isNew) {
    //         this.entity = this.createBlankEntity();
    //     }
    //     else {
    //         this.route.params.subscribe((params: Params) => {
    //             let uuid = params['id'];
    //
    //             // this.entityApiService.one('services', uuid).get().subscribe(res => {
    //             this.entityApiService.getOne(this.entityUrlPrefix, uuid).subscribe(res => {
    //                 this.entity = res;
    //                 this.headerTitle = this.entity.uuid;
    //             });
    //             // this.entityApiService.restangular.oneUrl(this.entityUrlPrefix, this.entityUrlPrefix + '/' + uuid).get().subscribe(res => {
    //             //     this.entity = res;
    //             //     this.headerTitle = this.entity.uuid;
    //             // });
    //         });
    //
    //     }
    // }

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
        this.entityApiService.resource(this.entityUrlPrefix).post(this.entity).subscribe((response) => {
            this.onEntitySave(response);
        }, (error) => {
            this.onEntitySaveError(error);
        });
    }

    saveExistingEntity(form: NgForm) {
        this.entity.put().subscribe((response) => {
            this.onEntitySave(response);
        }, (error) => {
            this.onEntitySaveError(error);
        });
    }

    onEntitySave(response) {
        console.log('Entity saved successfully, server response: ', response);
        this.toastr.success('Entity saved successfully');

        const routerLink = this.isNew ? '../list' : '../show';
        this.router.navigate([routerLink], {relativeTo: this.route});
    }

    onEntitySaveError(error) {
        console.error('There was an error saving entity', error);
        this.toastr.error('Failed to save the entity');
    }
}
