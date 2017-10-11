import { Component, Injector } from '@angular/core';

import { NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { FormioApiService } from '../../../../shared/services/formio-api.service';
import { FormioController } from "../../../../shared/components/modals/formio-controller";
import { FormioModalFrameComponent } from "../../../../shared/components/modals/formio-modal-frame.component";

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-task-show',
    templateUrl: '../templates/task-show.template.html'
})
export class DsTaskShowComponent extends DsBaseEntityShowComponent implements FormioController {

    entityUrlPrefix = 'tasks';

    formioModal: NgbModalRef;
    iFrameModalComponent: FormioModalFrameComponent;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService,
                protected formioApiService: FormioApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
        this.formioApiService.setEntityApiService(entityApiService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.backLink = new Link(['/pages/tasks'], 'general.menu.tasks');
    }

    ngOnDestroy() {
        if (this.formioModal) {
            this.formioModal.close();
        }

        super.ngOnDestroy();
    }

    // // // Formio // // // // // // // // // // // // // // // // // // // // // // // //

    protected activateFormioForm() {
        this.openModalIFrame();
    }

    protected openModalIFrame() {
        const modalOptions: NgbModalOptions = {
            size: 'lg',
            windowClass: 'formio-modal-frame',
        };

        const modalBreadcrumbsTitles = [
            this.getTranslatedPropertyValue(this.entity, 'title'),
        ];

        this.formioModal = this.modal.open(FormioModalFrameComponent, modalOptions);
        this.iFrameModalComponent = this.formioModal.componentInstance;
        this.iFrameModalComponent.setFormioController(this);
        this.iFrameModalComponent.setBreadcrumbs(modalBreadcrumbsTitles);
    }

    requestFormioForm(): Observable<any> {
        return this.formioApiService.getForm('tasks', this.entity.uuid);
    }

    submitFormioForm(formData: any): Observable<any> {
        return this.formioApiService.submitFormUsingPost('tasks', this.entity.uuid, formData).flatMap(submissionResult => {
            this.formioModal.close();
            this.toastr.success(this.translate.instant('ds.microservices.entity.task.submissionSuccess'));
            return Observable.of(submissionResult);
        });
    }

    handleFormioFormEvent(lifeCycleMethod: string, arg: any) {
        // Do nothing
    }
}
