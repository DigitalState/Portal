import { Component, Input } from '@angular/core';

import { LocalApiUtils } from '../../digitalstate/utils/local-api.utils';
import { IdentityApiService } from '../services/identity.service';

import { Observable } from 'rxjs/Observable';

import find from 'lodash/find';

@Component({
    selector: 'identity-link',
    template:
        `<a [routerLink]="identityLink?.routerLink">
            <span class="identity-type">{{ identityType }}</span>
            <span *ngIf="identity" class="identity-title">({{ identity.title ? identity.title[language] : 'N/A' }})</span>
        </a>`,
})
export class IdentityLinkComponent {

    @Input() protected identityType: string;
    @Input() protected identityUuid: string;
    @Input() protected language: string;

    /**
     * The Identity entity used to render the title
     */
    protected identity: any;
    protected identityLink: { routerLink: Array<string>, title: any };

    constructor(protected identityApiService: IdentityApiService) {

    }

    ngOnInit() {
        this.identityLink = LocalApiUtils.createIdentityEntityLink(this.identityType, this.identityUuid);
        this.identityApiService.getIdentitiesList(this.identityType).subscribe(identities => {
            this.identity = find(identities, { 'uuid': this.identityUuid });
        });
    }
}