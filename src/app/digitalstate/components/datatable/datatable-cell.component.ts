
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
    selector: 'ds-datatable-cell',
    template: `
        <span>{{outputValue}}</span>
    `
})
export class DsDatatableCell {
    @Input() value: any;
    @Input() row: any;
    @Input() column: any;

    outputValue: null;

    ngOnInit() {
        // Render the cell value according to the property type
        if (this.column.propertyMetadata.field) {
            // For a property of type `select`, render the property's label instead of its value
            if (this.column.propertyMetadata.field.type === 'select') {
                this.outputValue = this.column.propertyMetadata.field.options[this.value];
            }
        }
        else {
            this.outputValue = this.value;
        }
    }
}
