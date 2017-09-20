import { Component, EventEmitter, Injector, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';

import { FormioOptions } from 'angular-formio';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { CmsApiService } from '../../../../shared/services/cms.service';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { isFunction } from 'rxjs/util/isFunction';

import isEmpty from 'lodash/isEmpty';

@Component({
    selector: 'ds-task-activate',
    templateUrl: '../templates/task-activate.template.html',
})
export class DsTaskActivateComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'tasks';
    headerTitle = 'general.menu.tasks';
    headerSubtitle = null;

    protected formioOptions: FormioOptions;
    protected formioFormSchema;
    protected formioLanguageEmitter: EventEmitter<string>;

    protected status: null | 'success' | 'failure';
    protected statusMessage: string;
    protected id: number;
    protected isActivated: boolean = false;

    constructor(protected injector: Injector,
                protected route: ActivatedRoute,
                protected http: Http,
                protected location: Location,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService,
                protected cms: CmsApiService,
                protected modal: NgbModal,
                protected toastr: ToastsManager) {

        super(injector, microserviceConfig);
        this.applyPageTitle();

        this.formioLanguageEmitter = new EventEmitter();
    }

    protected prepareEntity(): Observable<any> {
        return super.prepareEntity().flatMap((prepared) => {
            this.activate();
            return Observable.empty();
        });
    }

    protected activate() {
        if (this.isActivated) {
            return;
        }

        this.isActivated = true;
        let uuid = this.entity.uuid;

        this.entityApiService.one('tasks', uuid).customGET('form').subscribe(result => {
            // For some reason, FormioOptions has to be initialized with some values after view init
            // but before the form schema is set
            this.formioOptions = {
                i18n: {}
            };

            // Load form translations from the CMS
            this.cms.getFormioFormTranslations(result.id).subscribe((formTranslations) => {
                // If translations exist for the form, merge them into the i18n form options
                if (!isEmpty(formTranslations)) {
                    this.formioOptions.i18n = formTranslations;
                }
            }, (error) => { // getFormioFormTranslations error handling
                console.warn('Error while fetching form translations', error);
            }, () => { // complete
                this.formioFormSchema = {
                    'components': result.schema
                };
            });

        }, (error) => { // customGET error handling
            this.handleActivationRequestError(error);
        });
    }

    protected switchFormLanguage(lang) {
        this.formioLanguageEmitter.emit(lang);
    }

    protected navigateBack() {
        this.location.back();
    }

    /**
     * When it renders, initialize form language to current UI language.
     * @param renderEvent
     */
    protected onFormioFormRender(renderEvent) {
        this.switchFormLanguage(this.translate.currentLang);
    }

    /**
     * Perform server-side validation and submit the form.
     * @param event
     */
    protected onFormioFormSubmit(submitEvent) {
        let submission = {
            'data': submitEvent.data,
        };

        this.entityApiService.one('tasks', this.entity.uuid).customPUT(submission, 'submission').subscribe((result) => {
            this.status = 'success';
            this.statusMessage = 'ds.microservices.entity.task.submissionSuccess';
            // this.router.navigate(['../show'], { relativeTo: this.route });
        }, (error) => { // error handling
            this.handleSubmissionRequestError(error);
        });

    }

    protected onFormioFormInvalid(event) {
        console.log('onFormioFormInvalid: ', event);
    }

    /**
     *
     * @param error
     * @returns {Promise<never>}
     */
    protected handleActivationRequestError(error: any) {
        this.status = 'failure';

        try {
            const json = isFunction(error.json) ? error.json() : null;

            if (json && json.message) {
                this.toastr.error(json.message);
                this.statusMessage = json.message;
            }
        }
        catch (exception) {
            this.statusMessage = 'ds.microservices.entity.task.activationFailure';
        }
    }

    /**
     *
     * @param error
     */
    protected handleSubmissionRequestError(error: any) {
        this.status = 'failure';

        try {
            const json = isFunction(error.json) ? error.json() : null;

            if (json && json.message) {
                this.toastr.error(json.message);
                this.statusMessage = json.message;
            }
        }
        catch (exception) {
            this.statusMessage = 'ds.microservices.entity.task.submissionFailure';
        }
    }
}
