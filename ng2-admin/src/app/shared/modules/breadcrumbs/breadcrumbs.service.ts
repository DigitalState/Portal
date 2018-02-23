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

    protected maxNumOfCrumbs = 5;

    protected crumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);

    protected defaultBreadcrumbPushOptions: BreadcrumbPushOptions = {
        forceIdenticalLink: false,
    };


    constructor() {

    }

    get crumbs(): Observable<Breadcrumb[]> {
        return this.crumbsSubject;
    }

    push(newCrumb: Breadcrumb, options?: BreadcrumbPushOptions): void {
        // Validate the breadcrumb by checking its `title` and `link`
        let crumbs = this.crumbsSubject.getValue();

        // Determine push options
        options = defaults(options, this.defaultBreadcrumbPushOptions);

        if (isEmpty(newCrumb.title) || isEmpty(newCrumb.link)) {
            console.warn('Skipped pushing invalid breadcrumb', newCrumb);
            return;
        }

        if (crumbs.length) {
            // if (isEqual(last(crumbs).title, newCrumb.title)) {
            //     console.warn('Skipped pushing breadcrumb with title identical to the last breadcrumb', newCrumb.title);
            //     return;
            // }
            if (options.forceIdenticalLink === false && isEqual(last(crumbs).link, newCrumb.link)) {
                console.warn('Skipped pushing breadcrumb with link identical to the last breadcrumb', newCrumb.link);
                return;
            }
        }

        crumbs.push(newCrumb);

        if (crumbs.length > this.maxNumOfCrumbs) {
            crumbs.shift();
        }

        this.crumbsSubject.next(crumbs);
    }
}

export interface BreadcrumbPushOptions {
    // Accept breadcrumb even if the previous breadcrumb has an identical link
    forceIdenticalLink?: boolean;
}