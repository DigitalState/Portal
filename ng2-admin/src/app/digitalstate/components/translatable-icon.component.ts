import { Component } from '@angular/core';


@Component({
    selector: 'translatable-icon',
    template:
        `<span class="translation-icon" title="{{ 'general.translatableField' | translate }}"></span>`,
    host:
    {
        class: 'translatable-icon'
    }
})
export class DsTranslatableIconComponent {

}