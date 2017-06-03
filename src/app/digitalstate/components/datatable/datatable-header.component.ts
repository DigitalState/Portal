
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
    selector: 'ds-datatable-header',
    template: `
		<strong (click)="sort()">{{column.name}}</strong>
		<div *ngIf="column.filterable" class="form-group">
			<input name="{{column.name}}" 
                   type="text" 
                   class="form-control" 
                   (keyup)="updateFilterValue($event)" 
                   (select)="muteEvent($event)" />
		</div>
    `
})
export class DsDatatableHeader {
    @Input() column: TableColumn;
    @Output() onFilterValueChange = new EventEmitter<any>();

    updateFilterValue(event) {
        this.onFilterValueChange.emit({column: this.column, event: event});
    }

    sort() {

    }

    // Mute events that cause strange behaviour such as input text disappearing
    muteEvent(event) {
        event.stopPropagation();
        event.preventDefault();
        console.log('DsDatatableHeader :: Event muted :: ', event.type);
    }
}
