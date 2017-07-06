import { Component, Injector } from '@angular/core';
import { DsBaseEntityComponent } from '../../components/base-entity.component';

@Component({
  selector: 'ds-task',
  template: `<router-outlet></router-outlet>`
})
export class DsTaskComponent extends DsBaseEntityComponent {

}
