import { Component, EventEmitter, Input, Output } from '@angular/core';
import 'rxjs/Rx';

@Component({
    selector: 'ds-entity-show',
    templateUrl: '../templates/entity-show.template.html'
})
export class DsEntityShowComponent {

    @Input() entity: any;

    @Output() onDelete = new EventEmitter<any>();

    constructor() {

    }

    ngOnInit() {

    }

    onDeleteClick(event) {
        this.onDelete.emit(event);
    }
}
