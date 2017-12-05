import { Injector } from '@angular/core';

import { Restangular } from 'ngx-restangular';

import { AppState } from '../../app.service';
import { PagedData } from '../../digitalstate/models/paged-data';
import { ListQuery } from '../../digitalstate/models/api-query';
import { GeneralUtils } from '../utils/general.utils';

import 'rxjs/Rx';
import { Observable } from 'rxjs';

/**
 * Generic type <T> refers to an entity model such as Service, Case, etc...
 */
export abstract class DsBaseEntityApiService<T> {

    protected appState: AppState;
    protected spaId: string;

    /**
     * Constructor
     * @param restangular An instance of Restangular that is pre-configured with the
     * settings (such as Base URL) that are specific to the EntityApiService extending
     * this class.
     */
    constructor(public restangular?: Restangular,
                protected injector?: Injector) {
        if (injector) {
            this.appState = injector.get(AppState);
            this.spaId = this.appState.get('config')['spaId'];
        }
    }

    /**
     * Proxy method for Restangular.all(...)
     * @param resourceUrl Entity path prefix (aka REST Resource collection) such as `services`, `cases`, etc...
     * @returns {any} An observable Restangular object
     */
    // public getList(query: ListQuery): Observable<PagedData<Service>> {
    public resource(resourceUrl: string): any {
        return this.restangular.all(resourceUrl);
    }

    /**
     * Proxy method for Restangular.one(...)
     * @param route
     * @param id
     * @returns {any} An observable Restangular object
     */
    public one(route: string, id: any): any {
        return this.restangular.one(route, id);
    }

    /**
     * Fetch a single entity
     * @param entityUrlPrefix Entity path prefix (aka REST Resource collection) such as `services`, `cases`, etc...
     * @param id The unique entity identifier
     * @returns {any} An observable entity
     */
    // public getList(query: ListQuery): Observable<PagedData<Service>> {
    public getOne(entityUrlPrefix: string, id: any): Observable<T> {
        return this.restangular.one(entityUrlPrefix, id).get();
    }

    /**
     * Fetch a list of entities.
     * @param query
     * @returns {any} An observable of PagedData
     */
    public getList(query: ListQuery): Observable<PagedData<T>> {
        return this.restangular
            .all(query.path)
            .getList(query.buildParameters())
            .reduce((pagedData, fetchedCollection) => {
                query.pager.totalItems = fetchedCollection.metadata['hydra:totalItems'];
                query.pager.totalPages = Math.ceil(query.pager.totalItems / query.pager.size);

                if (this.spaId === 'portal') {
                    // The current page value received from the API (if any) overrides current page number on the client-side
                    const currentQueryPathParams = GeneralUtils.parseQueryString(fetchedCollection.metadata['hydra:view']['@id']);
                    if (currentQueryPathParams.page) {
                        query.pager.pageNumber = parseInt(currentQueryPathParams.page);
                    }
                }

                pagedData.pager = query.pager;
                pagedData.data = fetchedCollection.map(this.mapToEntity);
                return pagedData;
        }, new PagedData<T>());
    }

    protected mapToEntity(fetchedEntity) {
        return fetchedEntity;
    }
}
