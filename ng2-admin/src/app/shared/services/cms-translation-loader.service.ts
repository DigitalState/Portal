import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CmsApiService } from './cms.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import isObject from 'lodash/isObject';
import merge from 'lodash/merge';


@Injectable()
export class CmsTranslateLoader extends TranslateHttpLoader {

    protected transCache: {[lang: string]: object} = {};
    protected transSubjects: {[lang: string]: Subject<any>} = {};

    constructor(http: Http, protected cmsService: CmsApiService, prefix?: string, suffix?: string) {
        super(http, prefix, suffix);

        console.log('CmsTranslateLoader constructor');
    }

    getTranslation(lang: string): Observable<any> {
        //
        if (this.transCache[lang]) {
            return Observable.of(this.transCache[lang]);
        }

        //
        if (!this.transSubjects[lang]) {
            this.transSubjects[lang] = new Subject();
            this.fetchTranslation(lang).subscribe();
        }

        return this.transSubjects[lang].asObservable();
    }

    protected fetchTranslation(lang: string): Observable<any> {
        return super.getTranslation(lang).flatMap((localTranslations: any) => {
            return this.cmsService.getTranslations().flatMap((cmsTranslations: any) => {
                if (isObject(cmsTranslations)) {
                    let mergedTranslations = merge(localTranslations, cmsTranslations[lang]);

                    this.transCache[lang] = mergedTranslations;
                    this.transSubjects[lang].next(mergedTranslations);
                    this.transSubjects[lang].complete();
                    return Observable.of(mergedTranslations);
                }
            }).catch((response: Response) => {
                console.warn(`Error while fetching CMS translations due to ${response.statusText}. Falling back to local translations.`);
                return Observable.of(localTranslations);
            });
        });
    }
}