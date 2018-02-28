import { Component, Input, ViewChild } from '@angular/core';

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

    /**
     * The number of most recent breadcrumbs to show.
     */
    @Input('limit')
    protected limit: number = 5;

    /**
     * Internal reference to the PerfectScrollbarComponent instance to update properties, listen for events, etc...
     */
    @ViewChild('perfectScrollbar')
    protected perfectScrollbar: PerfectScrollbarComponent;

    /**
     * Current interface language key
     */
    protected lang: string;

    /**
     * List of Breadcrumbs to display.
     */
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
            this.crumbs = crumbs.slice(this.limit * -1);
            this.updateScrollable();
        });
    }

    ngOnDestroy(): void {
        Object.keys(this.subscriptions).forEach(key => this.subscriptions[key].unsubscribe());
        this.subscriptions = undefined;
    }

    protected updateScrollable() {
        if (this.perfectScrollbar) {
            setTimeout(() => {
                this.perfectScrollbar.directiveRef.update();
                this.perfectScrollbar.directiveRef.scrollToRight();
            }, 250);
        }
    }
}