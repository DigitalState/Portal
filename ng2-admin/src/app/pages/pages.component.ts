import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { AppState } from '../app.service';
import { BaMenuService } from '../theme';
import { PagesMenu } from './pages.menu';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <!--<footer class="al-footer clearfix">-->
      <!--<div class="al-footer-right" translate>{{'general.created_with'}} <i class="ion-heart"></i></div>-->
      <!--<div class="al-footer-main clearfix">-->
        <!--<div class="al-copy">&copy; <a href="http://akveo.com" translate>{{'general.akveo'}}</a> 2016</div>-->
        <!--<ul class="al-share clearfix">-->
          <!--<li><i class="socicon socicon-facebook"></i></li>-->
          <!--<li><i class="socicon socicon-twitter"></i></li>-->
          <!--<li><i class="socicon socicon-google"></i></li>-->
          <!--<li><i class="socicon socicon-github"></i></li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</footer>-->
    <ba-back-top position="200"></ba-back-top>
    `,
  host: {
    id: 'pages',
    class: 'd-block w-100',
  }
})
export class Pages {

  constructor(protected appState: AppState,
              protected menuService: BaMenuService,
              protected pagesMenu: PagesMenu) {
  }

  ngOnInit() {
    // Inject discovery data manually into the `getMenu()` method of PagesMenu since it
    // fails to accept automatically injected dependencies in the constructor
    const discovery = this.appState.get('discovery');
    this.menuService.updateMenuByRoutes(<Routes>this.pagesMenu.getMenu(discovery));
  }
}
