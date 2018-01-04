import { Injector } from '@angular/core';
import {Component} from '@angular/core';

import {AuthService} from '../../../shared/modules/auth/auth.service';
import { DsCmsContentSubscriber } from '../../../shared/components/cms-content-subscriber.component';

import {GlobalState} from '../../../global.state';

import 'style-loader!./baPageTop.scss';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop extends DsCmsContentSubscriber {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  protected appTitle: any;
  protected appLogo: any;
  protected appLogoType: any;

  constructor(private injector: Injector,
              private _state: GlobalState,
              private auth: AuthService) {

    super(injector);

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  protected onAppCmsContent() {
    this.appTitle = this.appState.get('appCmsContent', {})['texts']['portal-title'];

    const appLogoObj = this.appState.get('appCmsContent', {})['files']['portal-logo-header'];
    this.appLogo = appLogoObj && appLogoObj.hasOwnProperty('presentation') ? appLogoObj['presentation'] : null;
    this.appLogoType = appLogoObj && appLogoObj.hasOwnProperty('type') ? appLogoObj['type'] : 'image/png';
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logout() {
    this.auth.logout();
  }
}
