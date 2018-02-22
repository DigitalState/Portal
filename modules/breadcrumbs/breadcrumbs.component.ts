import { Component, ViewChild } from '@angular/core';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { BreadcrumbsService } from './breadcrumbs.service';
import { Breadcrumb } from './breadcrumb';

import { Subscription } from "rxjs/Subscription";
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';


@Component({
    selector: 'ds-breadcrumbs',
    templateUrl: 'breadcrumbs.template.html',
})
export class BreadcrumbsComponent {

    @ViewChild('perfectScrollbar')
    protected perfectScrollbar: PerfectScrollbarComponent;

    protected lang: any;
    protected crumbs: Breadcrumb[];

    /**
     * Component subscriptions
     * @type {Subscription[]}
     */
    protected subscriptions: { [subName: string]: Subscription } = {};


    constructor(protected translate: TranslateService,
                protected breadcrumbsService: BreadcrumbsService) {

    }

    ngOnInit(): void {
        // Ensure translations are loaded before rendering the template
        // const translationTestKey = 'languages';
        // let intervalCounter = 0;
        // let interval = setInterval(() => {
        //     const translationTestValue = this.translate.instant(translationTestKey);
        //     console.log('translationTestKey', translationTestKey, 'translationTestValue', translationTestValue);
        //     if (translationTestValue === translationTestKey) {
        //         console.warn('Translation loading check - attempt: ', ++intervalCounter);
        //     }
        //     else {
        //         this.init();
        //         clearInterval(interval);
        //     }
        // }, 1000);

        this.init();
    }

    init() {
        this.lang = this.translate.currentLang;

        // Subscribe to language-change events
        this.subscriptions['lang'] = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.lang = this.translate.currentLang;
            this.updateScrollable();
        });

        // Subscribe to breadcrumbs changes
        this.subscriptions['crumbs'] = this.breadcrumbsService.crumbs.subscribe((crumbs) => {
            this.crumbs = crumbs;
            this.updateScrollable();
        });
    }

    ngOnDestroy(): void {
        Object.keys(this.subscriptions).forEach(key => this.subscriptions[key].unsubscribe());
        this.subscriptions = undefined;
    }

    protected updateScrollable() {
        setTimeout(() => {
            this.perfectScrollbar.directiveRef.update();
            this.perfectScrollbar.directiveRef.scrollToRight();
        }, 250);
    }
}