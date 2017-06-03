import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';

import { DefaultModal } from './modals/default-modal/default-modal.component';
import { DsBaseEntityApiService } from '../services/base-entity-api.service';
import { MicroserviceConfig } from '../modules/microservice.provider';
import 'rxjs/Rx';

export abstract class DsBaseEntityShowComponent {

    protected entityUrlPrefix: string;
    protected headerTitle: string;
    protected entity;

    /**
     * A shortcut to the entity's metadata from the MicroserviceConfig.
     */
    protected entityMetadata = {};

    /**
     * The Enity API service is not injected into this base component class because
     * the API service configurations are Microservice-specific.
     */
    protected entityApiService: DsBaseEntityApiService<any>;

    protected id: number;

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected microserviceConfig: MicroserviceConfig,
                protected toastr: ToastsManager,
                protected modal: NgbModal) {

    }

    ngOnInit() {
        this.entityMetadata = this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties;
        this.prepareEntity();
    }

    protected prepareEntity() {
        this.route.params.forEach((params: Params) => {
            this.id = params['id'];
            console.log(this.id);
        });

        this.entityApiService.getOne(this.entityUrlPrefix, this.id).subscribe(res => {
            this.entity = res;

            if (this.headerTitle == null) {
                this.headerTitle = this.entity.uuid;
            }
        });

    }

    onDelete(event) {
        const modal = this.modal.open(DefaultModal, {size: 'lg'});
        modal.componentInstance.modalHeader = 'Confirm';
        modal.componentInstance.modalContent = `Are you sure you want to delete this entity?`;
        modal.componentInstance.actions = [
            { command: 'yes', label: 'Yes' },
            { command: 'no', label: 'No' },
        ];

        modal.result.then((modalResult) => {
            console.log(modalResult);
            if (modalResult.command === 'yes') {
                this.entity.remove()
                    .subscribe((response) => {
                        this.onEntityDeleteSuccess(response);
                    }, (error) => {
                        this.onEntityDeleteError(error);
                    });
            }
        }, (modalRejection) => {
            // handle the case where the user naturally exits the modal dialog
        });

    }

    onEntityDeleteSuccess(response) {
        console.log('Entity deleted successfully, server response: ', response);
        this.toastr.success('Entity deleted successfully');
        this.router.navigate(['../../list'], { relativeTo: this.route });
    }

    onEntityDeleteError(error) {
        console.error('Failed to delete entity', error);
        this.toastr.error('Failed to delete entity');
    }
}
