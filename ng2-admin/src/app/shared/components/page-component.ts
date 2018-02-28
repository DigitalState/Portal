import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';

import { DsStaticTranslationService } from '../services/static-translation.service';
import { BreadcrumbPushOptions, BreadcrumbsService } from '../modules/breadcrumbs/breadcrumbs.service';
import { Breadcrumb } from '../modules/breadcrumbs/breadcrumb';

import { GlobalState } from "../../global.state";


@Component({

})
export class DsPageComponent {

    /**
     * The pageTitle and pageSubtitle.
     */
    protected pageTitle: string;
    protected pageSubtitle: string;
    protected pageBreadcrumbData: { title?: string | any, subtitle?: string | any, tags?: Array<string> } = {};

    // Dependency-Injected objects

    protected globalState: GlobalState;

    // protected translate: TranslateService;
    protected staticTranslate: DsStaticTranslationService;
    protected route: ActivatedRoute;
    protected location: Location;
    protected breadcrumbService: BreadcrumbsService;


    constructor(protected injector: Injector) {
        this.route = this.injector.get(ActivatedRoute);
        this.location = this.injector.get(Location);
        // this.translate = this.injector.get(TranslateService);
        this.staticTranslate = this.injector.get(DsStaticTranslationService);
        this.globalState = this.injector.get(GlobalState);
        this.breadcrumbService = this.injector.get(BreadcrumbsService);
    }

    ngOnInit(): void {
        if (this.pageTitle) {
            this.applyPageTitle();
        }

        this.setBreadcrumbData();
    }

    /**
     * Update the page title via a global-state notification. The function looks for the provided title string
     * first, if not provided it tries to use the `pageTitle` property. If none of those is set it exists and the
     * currently active title remains.
     *
     * @param title
     */
    applyPageTitle(title?: string) {
        let pageTitle = title || this.pageTitle;

        if (pageTitle) {
            setTimeout(() => {
                this.globalState.notifyDataChanged('menu.activeLink', {
                    'title': pageTitle
                });
            });
        }
    }

    protected setBreadcrumbData(): void {
        if (this.pageTitle) {
            this.pageBreadcrumbData.title = this.pageTitle;
        }
    }

    /**
     * Generate a breadcrumb based on data defaults from this page component.
     * @return {Breadcrumb}
     */
    protected buildBreadcrumb(): Breadcrumb {
        // Break path components to be used in tags
        let tags = this.location.path().split('/').slice(2, 3).map(cmp => 'path-' + cmp);

        // if the title or subtitle is a translation key, convert it to a translation object with language keys
        let crumb = {
            'title': (typeof this.pageBreadcrumbData.title) === 'string'
                ? this.staticTranslate.instantAll(this.pageBreadcrumbData.title)
                : this.pageBreadcrumbData.title,

            'subtitle': (typeof this.pageBreadcrumbData.subtitle) === 'string'
                ? this.staticTranslate.instantAll(this.pageBreadcrumbData.subtitle)
                : this.pageBreadcrumbData.subtitle,

            'link': this.location.path(),

            'tags': [].concat(tags, this.pageBreadcrumbData.tags),

            'routeData': this.route.snapshot.data,
        };

        return crumb as Breadcrumb;
    }

    /**
     * Commit a breadcrumb to the Breadcrumb service. If no custom breadcrumb is provided,
     * generate a default breadcrumb.
     * @param crumb {Breadcrumb} The breadcrumb to commit.
     */
    commitBreadcrumb(crumb?: Breadcrumb, options?: BreadcrumbPushOptions): void {
        if (!crumb) {
            crumb = this.buildBreadcrumb();
        }

        this.breadcrumbService.push(crumb, options);
    }
}