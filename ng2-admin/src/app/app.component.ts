import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

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

    constructor(private router: Router,
                private _state: GlobalState,
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
        // The parameter `results` contains all results of observables
        // in the order in which they registered in the preloader
        BaThemePreloader.load().subscribe((results: Array<any>) => {
            // console.log('Results', results);
            this._spinner.hide();
            this.router.initialNavigation();
        }, (error) => {
            console.error('Theme preloading error', error);
        }, () => {
            console.log('Theme preloading completed');
        });
    }

    /**
     * Preload images (if any)
     */
    private loadImages(): void {
        // register some loaders
        // BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
    }

    /**
     * Preload initial CMS content (texts, etc...)
     */
    private loadContent(): void {
        const contentSlugs = {
            'texts[]': ['portal-title'],
            'files[]': ['portal-logo-login', 'portal-logo-header'],
        };

        let cmsContentLoader: Observable<any> = this.cms.getContentBySlugs(contentSlugs).flatMap(content => {
            // console.log('AppState in loadContent', this.appState);
            this.appState.set('appCmsContent', content);
            return Observable.of(true);
        });

        BaThemePreloader.registerLoader(cmsContentLoader);
    }
}
