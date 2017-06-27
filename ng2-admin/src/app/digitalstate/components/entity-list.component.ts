import { Component, Inject, TemplateRef, ViewChild, ContentChild, Output, EventEmitter, Input } from '@angular/core';

// import 'style-loader!../styles/style.scss';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Service } from '../models/service';
import { Link } from '../models/Link';

import 'rxjs/Rx';

@Component({
    selector: 'ds-entity-list',
    templateUrl: '../templates/entity-list.template.html'
})
export class DsEntityListComponent {
    @Input() headerTitle: string;
    @Input() headerSubtitle: string;
    @Input() backLink: Link;
    @Input() actions: { [s: string]: boolean };
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
