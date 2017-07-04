import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop {

  public activePageTitle:string = '';
  public activePageSubtitle:string;

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        // Workaround for ng2-admin issue that causes the menu item's title to be set on every route change
        // which does not allow clean setting of page titles manually. So, here we force this subscription to
        // activeLink change to ignore requests from the baMenu component which have the active `route`
        // object set in the provided `activeLink` argument.
        if (activeLink.route === undefined) {
          this.activePageTitle = activeLink.title;
          this.activePageSubtitle = activeLink.subtitle;
        }
        else {
          return;
        }
      }
    });
  }
}
