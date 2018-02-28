import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { BreadcrumbsService } from '../../../../../shared/modules/breadcrumbs/breadcrumbs.service';

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

  constructor(private location: Location,
              private _state: GlobalState,
              private appState: AppState,
              protected breadcrumbsService: BreadcrumbsService) {
  }

  public onClickItem(menuItem: any, $event): any {
    // const $a = jQuery($event.target).closest('a');
    // const href = $a.attr('href');
    // console.log('href:', href);
    // console.log('location.path:', this.location.path());

    if (menuItem && menuItem.url) {
      if (menuItem.url.length === 0 || menuItem.url === '#') {
        $event.preventDefault();
        return false;
      }

      if (menuItem.url !== ('#' + this.location.path())) {
        this.breadcrumbsService.clear();
      }
    }
    else {
      console.log('Invalid menu item or missing `url`.', menuItem);
    }

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
