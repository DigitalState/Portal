import { Component } from '@angular/core';
import { DsBaseEntityComponent } from '../../components/base-entity.component';

@Component({
  selector: 'ds-interaction',
  template: `<router-outlet></router-outlet>`
})
export class DsInteractionComponent extends DsBaseEntityComponent {

}
