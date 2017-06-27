import { Component, Input } from '@angular/core';

import { Link } from '../models/Link';

@Component({
    'selector': 'back-link',
    'template':
        `<div class="back-link">
		    <a *ngIf="link" href [routerLink]="link.routerLink"><span>← </span> {{link.text}}</a>
	    </div>`,
})
export class DsBackLink {
    @Input() link: Link;
}