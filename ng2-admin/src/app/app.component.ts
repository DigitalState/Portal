import { Component, Renderer2, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { ToastsManager, Toast } from 'ng2-toastr';

import { GlobalState } from './global.state';
import { AppState } from './app.service';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import { ThemerStyleGenerator } from './digitalstate/utils/ThemerStyleGenerator';

import { CmsApiService } from './shared/services/cms.service';
import { ThemerService } from './shared/services/themer.service';

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
    private supportedLanguages: Array<string> = ['en', 'fr'];


    constructor(private renderer: Renderer2,
                private router: Router,
                private globalState: GlobalState,
                private appState: AppState,
                private _imageLoader: BaImageLoaderService,
                private _spinner: BaThemeSpinner,
                private viewContainerRef: ViewContainerRef,
                private themeConfig: BaThemeConfig,
                private toastr: ToastsManager,
                private translate: TranslateService,
                private cms: CmsApiService,
                private themer: ThemerService) {

        // Create a local instance of the ThemeStyleGenerator and inject it into the ThemerService
        let themerStyleGenerator = new ThemerStyleGenerator(this.appState, this.themer);
        this.themer.init(this.renderer, themerStyleGenerator);

        this.toastr.setRootViewContainerRef(this.viewContainerRef);
        this.themeConfig.config();
    }

    protected ngAfterViewInit(): void {
        // Wait for CmsApiService to be ready, then load the Theme Preloader
        if (this.globalState.valueOf('cms.ready')) {
            this.onCmsReady();
        }
        else {
            this.globalState.subscribe('cms.ready', () => {
                this.onCmsReady();
                // console.log('AppComponent received `cms.ready`');
            });
        }
    }

    protected onCmsReady(): void {
        this.registerLoaders();
        this.runPreloader();
    }

    protected registerLoaders(): void {
        this.loadImages();
        this.loadContent();
        this.loadTranslations();

        this.globalState.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    protected runPreloader() {
        // hide spinner once all loaders are completed
        // The parameter `results` contains all results of observables
        // in the order in which they registered in the preloader
        BaThemePreloader.load().subscribe((results: Array<any>) => {
            this._spinner.hide(1000);
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
            'datas[]': ['portal-theme'],
        };

        let cmsContentLoader: Observable<any> = this.cms.getContentBySlugs(contentSlugs)
            .catch(error => {
                // Errors cannot be translated yet at this point
                const errMessage = 'Unable to load initial content from CMS.';
                this.toastr.error(errMessage, null, { 'dismiss': 'click' });
                return Observable.throw({
                    message: errMessage,
                } as DsError);
            })
            .flatMap(content => {
                // console.log('AppState in loadContent', this.appState);
                this.appState.set('appCmsContent', content);

                // Notify Themer about theme data being available
                this.themer.onThemeDataLoaded();
                return Observable.of(true);
        });

        BaThemePreloader.registerLoader(cmsContentLoader);
    }

    protected loadTranslations(): void {
        const translationsLoader = Observable.create(observer => {
            // Get default or previously used language (if any) from localStorage
            const defaultLang = localStorage.getItem('lang') || this.supportedLanguages[0];
            this.translate.addLangs(this.supportedLanguages);

            // Preload other translations so the app can support multiple translations in a single page
            this.supportedLanguages.forEach(lang => {
              if (lang !== defaultLang) {
                this.translate.getTranslation(lang);
              }
            });

            // Now, preload the default language's translations to overcome the Translation Service issue which
            // causes UI translation synchronization problems
            this.translate.getTranslation(defaultLang);

            this.translate.setDefaultLang(defaultLang);
            this.translate.use(defaultLang);

            observer.next();
            observer.complete();
        });

        BaThemePreloader.registerLoader(translationsLoader);
    }
}
