import { Component, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'ds-short-uuid',
    template: `
		<span title="{{ outputTitle }}" class="cursor-pointer">{{ outputValue }}</span>
    `,
    host: {
        class: 'ds-short-uuid'
    }
})
export class DsShortUuidComponent {

    @Input() uuid: string;

    outputTitle: string;
    outputValue: string;

    constructor(private elementRef:ElementRef) {

    }

    ngOnInit() {
        // Use the outputValue that has been pre-formatted by the parent cell formatter
        if (this.uuid) {
            this.outputTitle = this.uuid;
            this.outputValue = this.uuid.substring(0, this.uuid.indexOf('-'));
        }
    }
}