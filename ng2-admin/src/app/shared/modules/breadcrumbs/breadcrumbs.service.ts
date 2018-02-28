import { Injectable } from '@angular/core';

import { Breadcrumb } from './breadcrumb';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import defaults from 'lodash/defaults';

@Injectable()
export class BreadcrumbsService {

    /**
     * Size of the breadcrumbs FILO container. When the size of the container reaches this limit
     * older breadcrumbs will be discarded.
     * @type {number}
     */
    protected cacheCapacity: number = 10;

    /**
     * Observable to notify about new breadcrumbs pushed in the container.
     * @type {BehaviorSubject<Breadcrumb[]>}
     */
    protected crumbsSubject: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);

    /**
     * Default options used when pushing new breadcrumbs. BreadcrumbPushOptions
     * @type {BreadcrumbPushOptions}
     */
    protected defaultBreadcrumbPushOptions: BreadcrumbPushOptions = {
        forceIdenticalLink: false,
    };


    constructor() {

    }

    /**
     * Return the breadcrumbs' observable for listeners to subscribe to.
     * @return {BehaviorSubject<Breadcrumb[]>}
     */
    get crumbs(): Observable<Breadcrumb[]> {
        return this.crumbsSubject;
    }

    /**
     * Add a new breadcrumb instance to the breadcrumbs trail.
     * @param newCrumb {Breadcrumb}
     * @param options
     */
    push(newCrumb: Breadcrumb, options?: BreadcrumbPushOptions): void {
        // Validate the breadcrumb by checking its `title` and `link`
        let crumbs = this.crumbsSubject.getValue();

        // Determine push options
        options = defaults(options, this.defaultBreadcrumbPushOptions);

        if (isEmpty(newCrumb.title) || isEmpty(newCrumb.link)) {
            // console.warn('Skipped pushing invalid breadcrumb', newCrumb);
            return;
        }

        if (crumbs.length) {
            // if (isEqual(last(crumbs).title, newCrumb.title)) {
            //     console.warn('Skipped pushing breadcrumb with title identical to the last breadcrumb', newCrumb.title);
            //     return;
            // }
            if (options.forceIdenticalLink === false && isEqual(last(crumbs).link, newCrumb.link)) {
                // console.warn('Skipped pushing breadcrumb with link identical to the last breadcrumb', newCrumb.link);
                return;
            }
        }

        crumbs.push(newCrumb);

        if (crumbs.length > this.cacheCapacity) {
            crumbs.shift();
        }

        this.crumbsSubject.next(crumbs);
    }

    /**
     * Remove all breadcrumbs.
     */
    clear(): void {
        this.crumbsSubject.next([]);
    }
}

export interface BreadcrumbPushOptions {
    // Accept breadcrumb even if the previous breadcrumb has an identical link
    forceIdenticalLink?: boolean;
}