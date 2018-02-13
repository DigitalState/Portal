import { Component, Inject, Input, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { IdentityApiService } from '../../services/identity.service';
import { AuthService } from '../../modules/auth/auth.service';

import { ElementBase } from './base';

@Component({
    selector: 'owner-select',
    template: `
        <md-select [(ngModel)]="value" class="w-100">
			<md-option *ngFor="let owner of owners" [value]="owner.uuid">
				{{ owner.title[language] }}
			</md-option>
            <!--<ng-content></ng-content>-->
        </md-select>
		<!--<select *ngIf="owners" [(ngModel)]="value">-->
			<!--<option *ngFor="let owner of owners" [value]="owner.uuid" [selected]="owner.uuid === value">-->
                <!--{{ owner.title[language] }}-->
            <!--</option>-->
            <!--&lt;!&ndash;<ng-content></ng-content>&ndash;&gt;-->
		<!--</select>-->
        
		<!--<validation-->
		<!--*ngIf="invalid | async"-->
		<!--[messages]="failures | async">-->
		<!--</validation>-->
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: OwnerSelectComponent,
        multi: true,
    }],
})
export class OwnerSelectComponent extends ElementBase<string> {

    @Input() language: string;
    @ViewChild(NgModel) model: NgModel;

    protected owners: Array<any>;

    constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
                @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
                protected auth: AuthService,
                protected identityApiService: IdentityApiService) {
        super(validators, asyncValidators);
    }

    ngOnInit() {
        this.identityApiService.getOwnersList().subscribe(owners => {
            this.owners = owners;
        }, error => {
            console.warn('Unable to fetch owners list.', error);
        });
    }
}