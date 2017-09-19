import { Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { DsBaseEntityApiService } from '../../shared/services/base-entity-api.service';

import { DefaultModal } from './modals/default-modal/default-modal.component';
import { MicroserviceConfig } from '../../shared/providers/microservice.provider';
import { DsEntityCrudComponent } from '../../shared/components/base-entity-crud-component';

import 'rxjs/Rx';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';

export abstract class DsBaseEntityShowComponent extends DsEntityCrudComponent {

    /**
     * Determines the default visibilty of action buttons
     * @type { [s: string]: boolean }
     */
    actions: { [s: string]: boolean } = {
        edit: true,
        delete: true,
    };

    /**
     * A shortcut to the entity's metadata from the MicroserviceConfig.
     */
    protected entityMetadata = {};

    /**
     * Language change observer
     */
    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    /**
     * Alias for the current interface language. Ex: `en`, `fr`, ec...
     */
    protected lang: string;

    /**
     * The Enity API service is not injected into this base component class because
     * the API service configurations are Microservice-specific.
     */
    protected entityApiService: DsBaseEntityApiService<any>;

    /* Other injectable dependencies */
    protected route: ActivatedRoute;
    protected router: Router;
    protected translate: TranslateService;
    protected toastr: ToastsManager;
    protected modal: NgbModal;

    constructor(injector: Injector, protected microserviceConfig: MicroserviceConfig) {
        super(injector);
        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
        this.translate = this.injector.get(TranslateService);
        this.modal = this.injector.get(NgbModal);
        this.toastr = this.injector.get(ToastsManager);
    }

    ngOnInit() {
        super.ngOnInit();

        this.entityMetadata = this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties;
        this.lang = this.translate.currentLang;

        // Subscribe to language-change events
        this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.prepareEntity().subscribe();
        });

        this.prepareEntity().subscribe();
    }

    ngOnDestroy() {
        // Unsubscribe from language-change events
        if (this.languageChangeSubscriber) {
            this.languageChangeSubscriber.unsubscribe();
            this.languageChangeSubscriber = undefined;
        }
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return this.route.params.flatMap((params: Params) => {
            let uuid = params['id'];
            let parentUuid = params[this.entityParentUrlParam];

            return this.entityApiService.getOne(this.entityUrlPrefix, uuid).flatMap(entity => {
                this.entity = entity;
                this.onEntityPrepared();

                return this.prepareEntityParent(this.entityParentUrlPrefix, parentUuid).flatMap(entityParent => {
                    return Observable.of({'entity': entity, 'entityParent': entityParent});
                });
            }).catch(error => {
                if (error instanceof Response) {
                    this.onPrepareEntityError(error);
                } else {
                    console.warn('Unexpected error occurred while fetching entity: ' + error);
                }
                throw error;
            });
        });
    }

    protected prepareEntityParent(urlPrefix: string, urlParam: string): Observable<any> {
        if (urlPrefix && urlParam) {
            return this.entityApiService.getOne(urlPrefix, urlParam).flatMap(entityParent => {
                this.entityParent = entityParent;
                this.generateBackLink();
                return Observable.of(entityParent);
            });
        }
        else {
            return Observable.of({});
        }
    }

    onPrepareEntityError(response: Response) {
        const message = this.translate.instant('ds.messages.http.' + response.status);
        this.toastr.error(message);
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

    /**
     * Stub called when the entity is fetched.
     */
    onEntityPrepared() {
        if (this.entity.title && this.entity.title.hasOwnProperty(this.translate.currentLang)) {
            this.applyPageTitle(this.entity.title[this.translate.currentLang]);
        }
    }
}
