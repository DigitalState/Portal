import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AppState } from '../../app.service';
import { AuthService } from '../modules/auth/auth.service';
import { DsBaseEntityApiService } from './base-entity-api.service';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import isNumber from 'lodash/isNumber';
import find from 'lodash/find';

@Injectable()
export class CmsApiService extends DsBaseEntityApiService<any> {

    /**
     * Anonymous token to access the CMS API
     */
    token: string;

    cmsUrlPrefix: string;
    contentPath: string;
    datasPath: string;
    translationSlugs: Array<string>;

    constructor(protected http: Http,
                protected appState: AppState,
                protected auth: AuthService) {
        super();

        const config = appState.get('microservices').cms;
        this.cmsUrlPrefix = config.entrypoint.url;
        this.contentPath = this.cmsUrlPrefix + config.paths.content;
        this.datasPath = this.cmsUrlPrefix + config.paths.datas;
        this.translationSlugs = config.translationSlugs;
    }

    /**
     * Retrieves translations from the CMS API using the provided `translationSlugs`.
     * If those are not provided, the default `translationSlugs` from the CMS metadata
     * will be used instead. @See `microservices.ts`.
     *
     * @param translationSlugs
     * @returns {Observable<R>}
     */
    getTranslations(translationSlugs?: Array<string>, merged: boolean = true): Observable<any> {
        if (!translationSlugs) {
            translationSlugs = this.translationSlugs;
        }

        return this.getRequestHeaders().flatMap((headers: Headers) => {
            let url = this.contentPath;
            let options = new RequestOptions({
                headers: headers,
                search: {
                    'datas[]': translationSlugs,
                }
            });

            return this.http.get(url, options)
                .map((response: Response) => {
                    // return response.json().datas['translation'];
                    return merged
                        ? this.mergeTranslations(response.json().datas)
                        : response.json().datas;
                })
                .catch((response: Response) => Observable.throw(response));
        });
    }

    getTranslationBySlug(slug: string): Observable<any> {
        return this.getRequestHeaders().flatMap((headers: Headers) => {
            let url = this.datasPath;
            let options = new RequestOptions({
                headers: headers,
                search: {
                    'slug': slug,
                }
            });

            return this.http.get(url, options)
                .map((response: Response) => {
                    return response.json();
                })
                .catch((response: Response) => Observable.throw(response.json()));
        });
    }

    getFormioFormTranslations(formId: string): Observable<any> {
        const slug = 'formio-' + formId;
        return this.getTranslationBySlug(slug).flatMap((entities: Array<any>) => {
            let entity = find(entities, (item) => item.slug === slug);
            return Observable.of(entity ? entity.data : null);
        });
    }

    saveTranslation(slug: string, value: any): Observable<any> {
        // First fetch the UUID of the datas entity of the translation using the slug
        return this.getTranslationBySlug(slug).flatMap((entities: Array<any>) => {
            let entity = find(entities, (item) => item.slug === slug);

            if (entity) {
                return this.getRequestHeaders().flatMap((headers: Headers) => {
                    let url = this.datasPath + '/' + entity.uuid;
                    let options = new RequestOptions({
                        headers: headers,
                    });
                    let body: any = {
                        'data': value
                    };

                    if (isNumber(entity.version)) {
                        body.version = entity.version + 1;
                    }

                    return this.http.put(url, body, options)
                        .map((response: Response) => {
                            return response.ok;
                        })
                        .catch((response: Response) => Observable.throw(response.json()));
                });
            }
            else {
                console.warn(`Unable to find entity with slug ${slug}`);
                return Observable.throw({
                    title: 'ds.messages.translationSaveFailed',
                    message: 'ds.messages.entityNotFound'
                } as DsError);
            }
        });
    }


    /**
     * Fetch one or more CMS entities in a batch request.
     * @param slugsMap The requests search dictionary of [entityType] => [Array of Slugs]
     *        The `entityType` must have `[]` appended to it in order to receive the entity collection.
     * @return {Observable<R>}
     */
    public getContentBySlugs(slugsMap: { [entityType: string]: Array<string> }): Observable<any> {
        return this.getRequestHeaders().flatMap((headers: Headers) => {
            let url = this.contentPath;
            let options = new RequestOptions({
                headers: headers,
                search: slugsMap,
            });

            return this.http.get(url, options)
                .map((response: Response) => {
                    return response.json();
                })
                .catch((response: Response) => Observable.throw(response));
        });
    }

    protected mergeTranslations(translationsContainer: any): any {
        let mergedTranslations = {};
        this.translationSlugs.forEach((translationKey) => {
            mergedTranslations = merge(mergedTranslations, translationsContainer[translationKey]);
        });
        return mergedTranslations;
    }

    protected getRequestHeaders(): Observable<Headers> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });

        // @Todo Improve token validation
        // Prefer a more authentic token to the anonymous one (if available)
        let authToken = this.auth.isLoggedIn() ? this.auth.getToken() : this.token;

        if (authToken) {
            headers.set('Authorization', `Bearer ${authToken}`);
            return Observable.of(headers);
        }
        else {
            return this.auth.getAnonymousToken().flatMap(token => {
                this.token = token;
                headers.set('Authorization', `Bearer ${token}`);
                return Observable.of(headers);
            });
        }
    }

}

