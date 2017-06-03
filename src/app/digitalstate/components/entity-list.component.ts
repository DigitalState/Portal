import {Component, Inject, TemplateRef, ViewChild, ContentChild, Output, EventEmitter} from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/Rx';

// import 'style-loader!../styles/style.scss';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from '../models/pager';
import { Service } from '../models/service';
import { DsBaseEntityApiService } from '../services/base-entity-api.service';
import { ListQuery } from '../models/api-query';
import { MicroserviceConfig, MICROSERVICE_RESTANGULAR } from '../modules/microservice.provider';
import { TemplateStorage } from '../services/template-storage.service';

@Component({
    selector: 'ds-entity-list',
    templateUrl: '../templates/entity-list.template.html'
})
export class DsEntityListComponent {
    @Output() onRefreshList = new EventEmitter();

    @ContentChild(DatatableComponent) datatable: DatatableComponent;

    constructor() {

    }

    ngOnInit() {

    }

    protected refreshList() {
        this.onRefreshList.emit();
    }
}
