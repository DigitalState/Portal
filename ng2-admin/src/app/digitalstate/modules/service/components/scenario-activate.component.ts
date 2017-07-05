import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { DefaultModal } from '../../../components/modals/default-modal/default-modal.component';
import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { isFunction } from 'rxjs/util/isFunction';

@Component({
    selector: 'ds-service-activate',
    templateUrl: '../templates/scenario-activate.template.html',
})
export class DsScenarioActivateComponent extends DsBaseEntityShowComponent {

    @ViewChild('modalSubmissionResult') modalSubmissionResultTpl: TemplateRef<any>;

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    headerTitle = 'general.menu.scenarios';
    headerSubtitle = null;
    pageTitle = '';

    protected formioFormSchema;
    protected submissionResult: string;
    protected status: null | 'success' | 'failure';
    protected statusMessage: string;
    protected id: number;

    constructor(protected injector: Injector,
                protected route: ActivatedRoute,
                protected http: Http,
                protected location: Location,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService,
                protected modal: NgbModal,
                protected toastr: ToastsManager) {
        super(injector, microserviceConfig);
        this.applyPageTitle();
    }

    protected activate() {
        let uuid = this.entity.uuid;
        this.entityApiService.one('scenarios', uuid).customGET('form').subscribe(result => {
            console.log('Scenarios/Form:', result);
            this.formioFormSchema = {
                'components': result.schema
            };
        }, (error) => { // error handling
            this.handleActivationRequestError(error);
        });
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

    /**
     * Perform server-side validation and submit the form.
     * @param event
     */
    protected onFormioFormSubmit(submitEvent) {
        console.log(submitEvent);
        console.log(this.entity);
        let submission = {
            'scenario': this.entity['@id'],
            'data': submitEvent.data,
            'version': 0,
        };

        this.entityApiService.resource('submissions').post(submission).subscribe((result) => {
            this.status = 'success';
            this.statusMessage = 'ds.microservices.entity.scenario.submissionSuccess';

            const modal = this.modal.open(DefaultModal, {size: 'lg'});
            modal.componentInstance.modalHeader = 'Response';
            modal.componentInstance.modalContent = `<pre>${JSON.stringify(result, null, 2)}</pre>`;

            // this.toastr.success('Form submitted successfully');
            // const modal = this.modal.open(this.modalSubmissionResultTpl, {size: 'lg'})
            // this.submissionResult = JSON.stringify(response.json(), null, 2);

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