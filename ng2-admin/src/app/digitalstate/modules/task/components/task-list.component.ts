import { Component, Injector } from '@angular/core';

import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { FormioApiService } from '../../../../shared/services/formio-api.service';
import { FormioController } from "../../../../shared/components/modals/formio-controller";
import { FormioModalFrameComponent } from "../../../../shared/components/modals/formio-modal-frame.component";

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-task-list',
    templateUrl: '../templates/task-list.template.html'
})
export class DsTaskListComponent extends DsBaseEntityListComponent implements FormioController {

    entityUrlPrefix = 'tasks';
    pageTitle = 'general.menu.tasks';

    formioModal: NgbModalRef;
    iFrameModalComponent: FormioModalFrameComponent;
    selectedEntityUuid: string; // set upon clicking on a row to activate it

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService,
                protected formioApiService: FormioApiService,
                protected modal: NgbModal) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
        this.formioApiService.setEntityApiService(entityApiService);
    }

    ngOnDestroy() {
        if (this.formioModal) {
            this.formioModal.close();
        }

        super.ngOnDestroy();
    }

    /**
     * Overriding `preprocessRowsData` to skip the filtering of entities without translated `title` properties.
     * @param fetchedData
     * @returns {any}
     */
    protected preprocessRowsData(fetchedData): Array<any> {
        // Add metadata container including list actions
        let rows;
        if (fetchedData) {
            rows = fetchedData.map((row) => {
                row['_'] = {
                    'actions': this.actions
                };
                return row;
            });
        }

        return rows;
    }

    // // // Formio // // // // // // // // // // // // // // // // // // // // // // //

    protected activateFormioForm(entity) {
        this.selectedEntityUuid = entity.uuid;
        this.openModalIFrame();
    }

    protected openModalIFrame() {
        const modalOptions: NgbModalOptions = {
            size: 'lg',
            windowClass: 'formio-modal-frame',
        };

        this.formioModal = this.modal.open(FormioModalFrameComponent, modalOptions);
        this.iFrameModalComponent = this.formioModal.componentInstance;
        this.iFrameModalComponent.setFormioController(this);
    }

    requestFormioForm(): Observable<any> {
        return this.formioApiService.getForm('tasks', this.selectedEntityUuid);
    }

    submitFormioForm(formData: any): Observable<any> {
        return this.formioApiService.submitFormUsingPut('tasks', this.selectedEntityUuid, formData, 'submission').flatMap(submissionResult => {
            this.formioModal.close();
            this.toastr.success(this.translate.instant('ds.microservices.entity.task.submissionSuccess'));
            return Observable.of(submissionResult);
        });
    }

    handleFormioFormEvent(lifeCycleMethod: string, arg: any) {
        // Do nothing
    }

}
