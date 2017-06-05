import { Observable } from 'rxjs';

import { Restangular } from 'ngx-restangular';
import { PagedData } from '../models/paged-data';
import { Service } from '../modules/service/models/service';
import { ListQuery } from '../models/api-query';
import { MICROSERVICE_RESTANGULAR } from '../modules/microservice.provider';

import 'rxjs/Rx';

/**
 * Generic type <T> refers to an entity model such as Service, Case, etc...
 */
export abstract class DsBaseEntityApiService<T> {

    /**
     * Constructor
     * @param restangular An instance of Restangular that is pre-configured with the
     * settings (such as Base URL) that are specific to the EntityApiService extending
     * this class.
     */
    constructor(protected restangular: Restangular) {

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

                pagedData.pager = query.pager;
                pagedData.data = fetchedCollection.map(this.mapToEntity);
                return pagedData;
        }, new PagedData<T>());
    }

    protected mapToEntity(fetchedEntity) {
        return fetchedEntity;
    }
}
