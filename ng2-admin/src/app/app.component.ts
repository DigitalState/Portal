import { Component, ViewContainerRef } from '@angular/core';

import { GlobalState } from './global.state';
import { AppState } from './app.service';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';

import { ToastsManager, Toast } from 'ng2-toastr'

import { CmsApiService } from './shared/services/cms.service';

import { Observable } from 'rxjs/Observable';

import 'style-loader!./app.scss';
import 'style-loader!./theme/initial.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  template: `      
      <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
          <div class="additional-bg"></div>
          <ds-microservices></ds-microservices>
          <router-outlet></router-outlet>
      </main>
  `
})
export class App {

  isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState,
              private appState: AppState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private viewContainerRef: ViewContainerRef,
              private themeConfig: BaThemeConfig,
              private toastr: ToastsManager,
              private cms: CmsApiService) {

      this.toastr.setRootViewContainerRef(viewContainerRef);
      themeConfig.config();
      this.loadImages();
      this.loadContent();

      this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
          this.isMenuCollapsed = isCollapsed;
      });
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private loadImages(): void {
    // register some loaders
    // BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }

    private loadContent(): void {
        const contentSlugs = {
            'texts[]': ['portal-title']
        };

        let loaderPromise: Promise<any> = this.cms.getContentBySlugs(contentSlugs).flatMap(content => {
            this.appState.set('appCmsContent', content);
            console.log('AppState in loadContent', this.appState);
            return Observable.of(true);
        }).toPromise().catch((rejectionReason: any) => {
            console.warn('Unable to load initial SPA content from CMS. Reason: ', rejectionReason);
        });

        BaThemePreloader.registerLoader(loaderPromise);
    }
}
