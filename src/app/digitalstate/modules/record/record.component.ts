import { Component } from '@angular/core';
import { DsBaseEntityComponent } from '../../components/base-entity.component';

@Component({
  selector: 'ds-record',
  template: `<router-outlet></router-outlet>`
})
export class DsRecordComponent extends DsBaseEntityComponent {

}
