import { Component, Input } from '@angular/core';

import { Link } from '../models/link';

@Component({
    'selector': 'back-link',
    'template':
            `<div class="back-link">
		<a *ngIf="link" href [routerLink]="link.routerLink">
			<span>← </span>
			<span translate>{{link.text}}</span>
		</a>
	</div>`,
})
export class DsBackLink {
    @Input() link: Link;
}