import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';

import { AppState } from '../../app.service';
import { GlobalState } from '../../global.state';
import { AuthService } from '../modules/auth/auth.service';
import { DsBaseEntityApiService } from './base-entity-api.service';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import merge from 'lodash/merge';
import isNumber from 'lodash/isNumber';
import find from 'lodash/find';

@Injectable()
export class CmsApiService extends DsBaseEntityApiService<any> {

    /**
     * Anonymous token to access the CMS API
     */
    protected token: string;

    protected config: any;
    protected cmsUrlPrefix: string;
    protected contentPath: string;
    protected datasPath: string;
    protected translationSlugs: Array<string>;

    constructor(protected http: Http,
                protected appState: AppState,
                protected globalState: GlobalState,
                protected auth: AuthService) {
        super();

        globalState.subscribe('auth.token.anonymous.loaded', () => {
            // console.log('CmsApiService received `auth.token.anonymous.loaded`');
            this.init();
            this.globalState.notify('cms.ready');
        });
    }

    init(): void {
        this.config = this.appState.get('microservices').cms;
        this.cmsUrlPrefix = this.config.entrypoint.url;
        this.contentPath = this.cmsUrlPrefix + this.config.paths.content;
        this.datasPath = this.cmsUrlPrefix + this.config.paths.datas;
        this.translationSlugs = this.config.translationSlugs;
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

    /**
     * Fetch a single CMS entity by its slug.
     * @param slug
     * @param type One of the CMS entity types (`datas`, `texts`, etc...)
     * @return {Observable<R>}
     */
    getEntityBySlug(slug: string, type: string): Observable<any> {
        return this.getRequestHeaders().flatMap((headers: Headers) => {
            let url = this.cmsUrlPrefix + this.config.paths[this.toPlural(type)];
            let options = new RequestOptions({
                headers: headers,
                search: {
                    'slug': slug,
                }
            });

            return this.http.get(url, options)
                .map((response: Response) => {
                    const json = response.json();
                    if (!json || !isArray(json) || json.length <= 0) {
                        let errResponse = new Response(new ResponseOptions({ status: 404, statusText: 'Not Found' }));
                        errResponse.ok = false;
                        Observable.throw(errResponse);
                    }
                    else {
                        return json[0];
                    }
                    // return isArray(json) && json.length > 0 ? json[0] : json;
                })
                .catch((response: Response) => Observable.throw(response.json()));
        });
    }

    saveData(slug: string, value: any): Observable<any> {
        return this.saveEntity(slug, 'data', value);
    }

    /**
     * Save an entity given it's slug.
     * First we need to determine the UUID of the entity by fetching it using the slug as a filter.
     * @param slug
     * @param type One of the CMS entity types (`datas`, `texts`, etc...).
     *        The `type` will automatically be transformed to Singluar or Plural form as needed.
     * @param value
     * @param savePrefs
     * @return {Observable<R>}
     */
    saveEntity(slug: string, type: string, value: any): Observable<any> {
        return this.getEntityBySlug(slug, type).flatMap((entity: any) => {
            if (entity) {
                return this.getRequestHeaders().flatMap((headers: Headers) => {
                    let url = this.cmsUrlPrefix + this.config.paths[this.toPlural(type)];
                    let options = new RequestOptions({ headers: headers });
                    let body: any = {};

                    body[this.toSingular(type)] = value;

                    if (isNumber(entity.version)) {
                        body.version = entity.version + 1;
                    }

                    return this.http.put(url + '/' + entity.uuid, body, options)
                        .map((response: Response) => {
                            return response.ok;
                        })
                        .catch((response: Response) => Observable.throw(response.json()));
                });
            }
            else {
                console.warn(`Unable to find entity with slug ${slug}`);
                return Observable.throw({
                    title: 'ds.messages.entitySaveFailed',
                    message: 'ds.messages.entityNotFound'
                } as DsError);
            }
        });
    }

    /**
     * Convert a CMS entity name to plural format.
     * @param type
     * @return {any}
     */
    toPlural(type: string): string {
        switch (type) {
            case 'data': return 'datas';
            case 'text': return 'texts';
            case 'file': return 'files';
            case 'page': return 'pages';
            default: return type;
        }
    }

    /**
     * Convert a CMS entity name to singular format.
     * @param type
     * @return {any}
     */
    toSingular(type: string): string {
        switch (type) {
            case 'datas': return 'data';
            case 'texts': return 'text';
            case 'files': return 'file';
            case 'pages': return 'page';
            default: return type;
        }
    }
}

