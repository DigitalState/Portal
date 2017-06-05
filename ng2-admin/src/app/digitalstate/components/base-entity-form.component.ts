import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { DsBaseEntityApiService } from '../services/base-entity-api.service';
import { MicroserviceConfig } from '../modules/microservice.provider';
import 'rxjs/Rx';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subscriber} from 'rxjs';

export abstract class DsBaseEntityFormComponent {

    entityForm: NgForm;
    currentForm: NgForm;

    entity: any;
    headerTitle: string = '';

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
     */
    protected entityMetadata = {};

    /**
     * The Enity API service is not injected into this base component class because
     * the API service configurations are Microservice-specific.
     */
    protected entityApiService: DsBaseEntityApiService<any>;

    protected translate: TranslateService;
    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    /*
     Reset the form with a new hero AND restore 'pristine' class state
     by toggling 'active' flag which causes the form
     to be removed/re-added in a tick via NgIf
     TODO: Workaround until NgForm has a reset method (#6822)
     */
    protected active = true;

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected location: Location,
                protected microserviceConfig: MicroserviceConfig,
                protected toastr: ToastsManager) {
    }

    ngOnInit() {
        this.entityMetadata = this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties;

        // Setup form errors object with empty messages
        Object.keys(this.entityMetadata).forEach((propertyName) => {
            this.formErrors[propertyName] = '';
        });

        this.prepareEntity();
    }

    protected prepareEntity() {
        if (this.isNew) {
            this.entity = {};
        }
        else {
            this.route.params.forEach((params: Params) => {
                this.id = params['id'];
                console.log(this.id);
            });

            // this.entityApiService.one('services', this.id).get().subscribe(res => {
            this.entityApiService.getOne(this.entityUrlPrefix, this.id).subscribe(res => {
                this.entity = res;
                this.headerTitle = this.entity.uuid;
            });
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

    onFormSubmit(form: NgForm) {
        // console.log(this.entityForm.value);
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
                const messages = this.entityMetadata[field].validation
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key].message + ' ';
                }
            }
        }
    }

    saveNewEntity(form: NgForm) {
        this.entityApiService.resource(this.entityUrlPrefix).post(form.value).subscribe((response) => {
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
