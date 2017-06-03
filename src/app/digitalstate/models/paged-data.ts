import { Pager } from './pager';

/**
 * An array of data with an associated pager object used for paging
 */
export class PagedData<T> {
    data = new Array<T>();
    pager = new Pager();
}
