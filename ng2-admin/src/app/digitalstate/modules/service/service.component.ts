import { Component, Injector } from '@angular/core';
import { DsBaseEntityComponent } from '../../components/base-entity.component';

@Component({
  selector: 'ds-service',
  template: `<router-outlet></router-outlet>`
})
export class DsServiceComponent extends DsBaseEntityComponent {

}
