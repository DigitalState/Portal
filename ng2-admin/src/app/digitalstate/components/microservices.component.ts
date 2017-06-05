import {Component} from '@angular/core';

@Component({
  selector: 'ds-microservices',
  template: `
      <template-storage></template-storage>
      <router-outlet></router-outlet>
  `,
  styleUrls: [
    '../styles/_index.scss',
  ]
})
export class DsMicroservicesComponent {

  constructor() {

  }
}
