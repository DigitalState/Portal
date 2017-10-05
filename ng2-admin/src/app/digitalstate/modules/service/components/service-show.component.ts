import { Component, Injector } from '@angular/core';

import { NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import Tabs from '../../../../shared/components/tabs'
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { FormioApiService } from '../../../../shared/services/formio-api.service';
import { FormioController } from "../../../../shared/components/modals/formio-controller";
import { FormioModalFrameComponent } from "../../../../shared/components/modals/formio-modal-frame.component";


import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { EntityApiService } from '../entity-api.service';
import { ListQuery } from '../../../models/api-query';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Link } from '../../../models/link';

@Component({
    selector: 'ds-service-show',
    templateUrl: '../templates/service-show.template.html',
    styleUrls: ['../styles/service-show.scss'],
})
export class DsServiceShowComponent extends DsBaseEntityShowComponent implements FormioController {

    entityUrlPrefix = 'services';
    headerTitle = 'Service Details';
    scenarios: Array<any> = [];
    loadingScenarios: boolean;

    scenariosTabs: Tabs;

    formioModal: NgbModalRef;
    iFrameModalComponent: FormioModalFrameComponent;
    selectedScenarioUuid: string; // set upon clicking `Activate` on a scenario

    constructor(injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService,
                protected formioApiService: FormioApiService) {


    super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
        this.formioApiService.setEntityApiService(entityApiService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.backLink = new Link(['/pages/services'], 'general.menu.serviceDirectory');
    }

    ngOnDestroy() {
        if (this.scenariosTabs) {
            this.scenariosTabs.destroy();
        }

        if (this.formioModal) {
            this.formioModal.close();
        }

        super.ngOnDestroy();
    }

    protected prepareEntity(): Observable<{ entity: any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap(preparedObject => { // success
            this.loadScenarios();
            return Observable.of({'entity': preparedObject.entity, 'entityParent': preparedObject.entityParent});
        });
    }


    protected updateTranslations(lang: string): void {
        super.updateTranslations(lang);

        if (this.entity) {
            this.loadScenarios();
        }
    }

    protected loadScenarios() {
        this.loadingScenarios = true;

        let requestParams = {
            'service.uuid': this.entity.uuid,
            'order[weight]': 'asc'
        };

        this.entityApiService.resource('scenarios').getList(requestParams).subscribe(scenariosData => {
            this.scenarios = [];
            scenariosData.forEach((scenario) => {
                this.scenarios.push(scenario);
            });
        }, () => { // error

        }, () => { // complete
            this.loadingScenarios = false;

            // Transform scenarios markup into tabs
            setTimeout(() => {
                this.scenariosTabs = new Tabs($('#scenarios-tabs'));
            }, 0);
        });
    }

    /**
     * Generate the redirection URL of a Scenario of type API or URL.
     * @param uuid Scenario UUID
     */
    protected getScenarioLinkUrl(uuid: string): string {
        return this.microserviceConfig.settings.entrypoint.url + 'scenarios/' + uuid + '/url';
    }

    // // // Formio // // // // // // // // // // // // // // // // // // // // // // // //

    protected activateFormioForm(scenarioUuid) {
        this.selectedScenarioUuid = scenarioUuid;
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
        return this.formioApiService.getForm('scenarios', this.selectedScenarioUuid);
    }

    submitFormioForm(formData: any): Observable<any> {
        return this.formioApiService.submitFormUsingPost('scenarios', this.selectedScenarioUuid, formData).flatMap(submissionResult => {
            this.formioModal.close();
            this.toastr.success(this.translate.instant('ds.microservices.entity.scenario.submissionSuccess'));
            return Observable.of(submissionResult);
        });
    }

    handleFormioFormEvent(lifeCycleMethod: string, arg: any) {
        // Do nothing
    }
}
