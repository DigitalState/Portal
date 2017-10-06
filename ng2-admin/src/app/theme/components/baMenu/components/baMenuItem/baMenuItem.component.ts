import {Component, Input, Output, EventEmitter} from '@angular/core';

import { GlobalState } from '../../../../../global.state';
import { AppState } from '../../../../../app.service';

import 'style-loader!./baMenuItem.scss';

@Component({
  selector: 'ba-menu-item',
  templateUrl: './baMenuItem.html'
})
export class BaMenuItem {

  @Input() menuItem:any;
  @Input() child:boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  constructor(private _state: GlobalState,
              private appState: AppState) {
  }

  public onClickItem($event):void {
    const xl = this.appState.get('config').breakpoints.xl;

    if (window.matchMedia(`(max-width: ${xl}px)`).matches) {
      this._state.notifyDataChanged('menu.isCollapsed', true);
    }
  }

  public onHoverItem($event):void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item):boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }
}
