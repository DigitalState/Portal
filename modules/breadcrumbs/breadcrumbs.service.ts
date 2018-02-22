import { Injectable } from '@angular/core';

import { Breadcrumb } from './breadcrumb';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';

@Injectable()
export class BreadcrumbsService {

    protected maxNumOfCrumbs = 5;

    protected crumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);


    constructor() {

    }

    get crumbs(): Observable<Breadcrumb[]> {
        return this.crumbsSubject;
    }

    push(newCrumb: Breadcrumb): void {
        // Validate the breadcrumb by checking its `title` and `link`
        let crumbs = this.crumbsSubject.getValue();

        if (isEmpty(newCrumb.title) || isEmpty(newCrumb.link)) {
            // console.warn('Skipped pushing invalid breadcrumb', newCrumb);
            return;
        }

        if (crumbs.length) {
            // if (isEqual(last(crumbs).title, newCrumb.title)) {
            //     console.warn('Skipped pushing breadcrumb with title identical to the last breadcrumb', newCrumb.title);
            //     return;
            // }
            if (isEqual(last(crumbs).link, newCrumb.link)) {
                // console.warn('Skipped pushing breadcrumb with link identical to the last breadcrumb', newCrumb.link);
                return;
            }
        }

        // Clean up the link so it has the hashtag at the beginning
        if (newCrumb.link) {

        }

        crumbs.push(newCrumb);

        if (crumbs.length > this.maxNumOfCrumbs) {
            crumbs.shift();
        }

        this.crumbsSubject.next(crumbs);
    }
}