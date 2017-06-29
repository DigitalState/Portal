
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

import {TranslateService} from '@ngx-translate/core';
import {DsEntityTranslationService} from '../../../shared/services/entity-translation.service';

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

    outputValue: any;


    constructor(protected entityTranslation: DsEntityTranslationService) {

    }

    ngOnInit() {
        let property = this.column.propertyMetadata;
        let hasTranslation = this.entityTranslation.propertyHasTranslation(this.value, property);

        // Render the cell value according to the property type
        if (property.field) {
            // For a property of type `select`, render the property's label instead of its value
            if (property.field.type === 'select') {
                this.outputValue = property.field.options[this.value];
            }
        }
        else {
            this.outputValue = this.value;
        }

        if (property.hasOwnProperty('translated')) {
            let translatedValue = this.entityTranslation.getTranslation(this.value, property);
            this.outputValue = translatedValue
        }
    }

}
