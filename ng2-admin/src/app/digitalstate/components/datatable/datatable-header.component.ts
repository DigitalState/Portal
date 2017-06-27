
import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {DataTableHeaderCellComponent, SortDirection, TableColumn} from '@swimlane/ngx-datatable';
import { nextSortDir } from '@swimlane/ngx-datatable/release/utils';

@Component({
    selector: 'ds-datatable-header',
    template: `
        <label *ngIf="isCheckboxable" class="datatable-checkbox">
            <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit(!allRowsSelected)" />
        </label>
        <span class="datatable-header-cell-wrapper">
            <span class="datatable-header-cell-label draggable" (click)="sort()" [innerHTML]="column.name"></span>
            <span (click)="sort()" [class]="sortClass"></span>
        </span>
        
        <span *ngIf="column.filterable" class="column-filter form-group">
            <input name="{{column.name}}" 
                   type="text" 
                   class="form-control" 
                   (keyup)="updateFilterValue($event)" 
                   (select)="muteEvent($event)" />
        </span>
    `,
    host: {
        class: 'ds-datatable-header'
    }
})
export class DsDatatableHeader {
    @Input() column: TableColumn;
    @Output() onFilterValueChange = new EventEmitter<any>();
    @Input() sortDir: SortDirection;

    /**
     * The function that is mapped by the header template to `onSort`
     * Call this function to trigger sorting by this column.
     **/
    @Input() sort: Function;

    // @HostBinding('class')
    // get columnCssClasses(): any {
    //     return 'ds-datatable-header';
    // }
    //

    // ngOnInit() {
    //     this.sortDir = this.column['initialSortDir'];
    // }

    updateFilterValue(event) {
        this.onFilterValueChange.emit({column: this.column, event: event});
    }

    //
    // onSort(): void {
    //     if(!this.column.sortable) return;
    //
    //     const newValue = nextSortDir(this.sortType, this.sortDir);
    //     this.sort.emit({
    //         column: this.column,
    //         prevValue: this.sortDir,
    //         newValue
    //     });
    //
    //     this.sortDir = newValue;
    //     this.sortClass = this.calcSortClass(this.sortDir);
    // }

    /**
     * Mute events that cause strange behaviour such as input text disappearing
     */
    muteEvent(event) {
        event.stopPropagation();
        event.preventDefault();
        console.log('DsDatatableHeader :: Event muted :: ', event.type);
    }
}
