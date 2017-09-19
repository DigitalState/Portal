import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';

import { FormioOptions } from 'angular-formio';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { DefaultModal } from '../../../components/modals/default-modal/default-modal.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { isFunction } from 'rxjs/util/isFunction';

@Component({
    selector: 'ds-task-activate',
    templateUrl: '../templates/task-activate.template.html',
})
export class DsTaskActivateComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'tasks';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    headerTitle = 'general.menu.tasks';
    headerSubtitle = null;

    protected formioOptions: FormioOptions;
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
        this.entityApiService.one('tasks', uuid).customGET('form').subscribe(result => {
            console.log('Tasks/Form:', result);
            this.formioFormSchema = {
                'components': result.schema
            };
        }, (error) => { // error handling
            this.handleActivationRequestError(error);
        });
    }

    protected navigateBack() {
        this.location.back();
    }

    protected prepareEntity(): Observable<any> {
        return super.prepareEntity().flatMap((prepared) => {
            this.activate();
            return Observable.empty();
        });
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
