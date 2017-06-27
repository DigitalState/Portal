
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
    selector: 'ds-datatable-cell-actions',
    template: `
		<ul class="btn-list clearfix">
			<li [hidden]="!row._.actions.show">
				<button [routerLink]="['../', row.uuid, 'show']" type="button" class="btn btn-default btn-with-icon">
                    <i class="ion-eye">{{'ds.microservices.entity.action.show' | translate}}</i>
                </button>
			</li>
			<li [hidden]="!row._.actions.edit">
				<button [routerLink]="['../', row.uuid, 'edit']" type="button" class="btn btn-default btn-with-icon">
                    <i class="ion-edit">{{'ds.microservices.entity.action.edit' | translate}}</i>
                </button>
			</li>
		</ul>
    `
})
export class DsDatatableCellActions {
    @Input() row: any;

    ngOnInit() {
        console.log(this.row._.actions);
    }
}
