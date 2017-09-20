import { Component, EventEmitter, Injector, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
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
    selector: 'ds-scenario-activate',
    templateUrl: '../templates/scenario-activate.template.html',
    styleUrls: ['../styles/scenario-activate.scss'],
    host: {
        'class': 'ds-scenario-activate'
    },
    encapsulation: ViewEncapsulation.None
})
export class DsScenarioActivateComponent extends DsBaseEntityShowComponent {

    @ViewChild('modalSubmissionResult') modalSubmissionResultTpl: TemplateRef<any>;

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    headerTitle = 'general.menu.scenarios';
    headerSubtitle = null;
    pageTitle = '';

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

        // this.entityApiService.getOne('scenarios', this.id).subscribe(res => {
        //     this.entity = res;
        //
        //     let activationRequestUrl = this.ACTIVATION_REQUEST_URL_PREFIX + this.id;
        //     this.http.get(activationRequestUrl)
        //         .toPromise()
        //         .then(response => {
        //             this.formioFormSchema = response.json();
        //         })
        //         .catch((error) => {
        //             this.handleActivationRequestError(error);
        //         }
        //     );
        // });
    }

    protected activate() {
        if (this.isActivated) {
            return;
        }

        this.isActivated = true;
        let uuid = this.entity.uuid;

        this.entityApiService.one('scenarios', uuid).customGET('form').subscribe(result => {
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

        }, (error) => { // error handling
            this.handleActivationRequestError(error);
        });
    }

    protected switchFormLanguage(lang) {
        this.formioLanguageEmitter.emit(lang);
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
        // console.log(submitEvent);
        // console.log(this.entity);
        let submission = {
            'data': submitEvent.data,
        };

        this.entityApiService.one('scenarios', this.entity.uuid).all('submissions').post(submission).subscribe((result) => {
            this.status = 'success';
            this.statusMessage = 'ds.microservices.entity.scenario.submissionSuccess';

            // const modal = this.modal.open(DefaultModal, {size: 'lg'});
            // modal.componentInstance.modalHeader = 'Response';
            // modal.componentInstance.modalContent = `<pre>${JSON.stringify(result, null, 2)}</pre>`;

            // this.router.navigate(['../show'], { relativeTo: this.route });
        }, (error) => { // error handling
            this.handleSubmissionRequestError(error);
        });

        // let activationRequestUrl = this.SUBMISSION_REQUEST_URL_PREFIX + this.id;
        // this.http.post(activationRequestUrl, JSON.stringify(submitEvent))
        //     .toPromise()
        //     .then(response => {
        //         console.log('Form submitted successfully', response.json());
        //         this.toastr.success('Form submitted successfully');
        //         const modal = this.modal.open(DefaultModal, {size: 'lg'});
        //         modal.componentInstance.modalHeader = 'Response';
        //         modal.componentInstance.modalContent = `<pre>${JSON.stringify(response.json(), null, 2)}</pre>`;
        //
        //         // const modal = this.modal.open(this.modalSubmissionResultTpl, {size: 'lg'})
        //         // this.submissionResult = JSON.stringify(response.json(), null, 2);
        //
        //         this.router.navigate(['../show'], { relativeTo: this.route });
        //     })
        //     .catch((error) => {
        //         this.handleSubmissionRequestError(error);
        //     });
    }

    protected onFormioFormInvalid(event) {
        console.log('onFormioFormInvalid: ', event);
    }

    protected onFormioFormError(event) {
        console.log('onFormioFormError: ', event);
    }

    // protected onFormioFormChange(event) {
    //     console.log('onFormioFormChange: ', event);
    // }

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
            this.statusMessage = 'ds.microservices.entity.scenario.activationFailure';
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
            this.statusMessage = 'ds.microservices.entity.scenario.submissionFailure';
        }
    }
}
