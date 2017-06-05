import 'rxjs/Rx';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DefaultModal } from '../../../components/modals/default-modal/default-modal.component';
import { EntityApiService } from '../entity-api.service';

@Component({
    selector: 'ds-service-activate',
    templateUrl: '../templates/activate.template.html',
})
export class DsServiceActivateComponent {
    readonly ACTIVATION_REQUEST_URL_PREFIX = 'http://localhost:8014/activation/';
    readonly SUBMISSION_REQUEST_URL_PREFIX = 'http://localhost:8014/submission/';

    public entity;
    public formioFormSchema;
    public submissionResult: string;
    @ViewChild('modalSubmissionResult') modalSubmissionResultTpl: TemplateRef<any>;

    private id: number;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private http: Http,
                private location: Location,
                private entityApiService: EntityApiService,
                private modal: NgbModal,
                private toastr: ToastsManager) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.id = params['id'];
            console.log(this.id);
        });

        this.entityApiService.getOne('services', this.id).subscribe(res => {
            this.entity = res;

            let activationRequestUrl = this.ACTIVATION_REQUEST_URL_PREFIX + this.id;
            this.http.get(activationRequestUrl)
                .toPromise()
                .then(response => {
                    this.formioFormSchema = response.json();
                })
                .catch((error) => {
                    this.handleActivationRequestError(error);
                }
            );
        });

    }

    /**
     * Perform server-side validation and submit the form.
     * @param event
     */
    private onFormioFormSubmit(submitEvent) {
        let activationRequestUrl = this.SUBMISSION_REQUEST_URL_PREFIX + this.id;
        this.http.post(activationRequestUrl, JSON.stringify(submitEvent))
            .toPromise()
            .then(response => {
                console.log('Form submitted successfully', response.json());
                this.toastr.success('Form submitted successfully');
                const modal = this.modal.open(DefaultModal, {size: 'lg'});
                modal.componentInstance.modalHeader = 'Response';
                modal.componentInstance.modalContent = `<pre>${JSON.stringify(response.json(), null, 2)}</pre>`;

                // const modal = this.modal.open(this.modalSubmissionResultTpl, {size: 'lg'})
                // this.submissionResult = JSON.stringify(response.json(), null, 2);

                this.router.navigate(['../show'], { relativeTo: this.route });
            })
            .catch((error) => {
                this.handleSubmissionRequestError(error);
            });
    }

    /**
     *
     * @param error
     * @returns {Promise<never>}
     */
    private handleActivationRequestError(error: any): Promise<any> {
        const json = error.json();

        if (json && json.message) {
            this.toastr.error(json.message);
            this.location.back();
        }

        console.error('Activation error occurred', error);
        return Promise.reject(error.message || error);
    }

    /**
     *
     * @param error
     * @returns {Promise<never>}
     */
    private handleSubmissionRequestError(error: any): Promise<any> {
        const json = error.json();

        if (json && json.message) {
            this.toastr.error(json.message);
        }

        console.error('Submission error occurred', error);
        return Promise.reject(error.message || error);
    }
}
