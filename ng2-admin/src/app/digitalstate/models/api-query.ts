import { Pager } from './pager';
/**
 * An object used to hold API query parameters
 */
export class ListQuery {
    urlPrefix: string;
    path: string;
    pager: Pager = new Pager();
    filters: any = {};
    orders: any = {};

    static forUrl(urlPrefix: string, path?: string): ListQuery {
        let listQuery = new ListQuery(path);
        listQuery.urlPrefix = urlPrefix;
        return listQuery;
    }

    constructor(path?: string) {
        this.path = path;
    }

    withPath(path: string): ListQuery {
        this.path = path;
        return this;
    }

    withFilter(filterName: string, filterValue: any): ListQuery {
        return this.setFilter(filterName, filterValue);
    }

    setFilter(filterName: string, filterValue: any): ListQuery {
        this.filters[filterName] = filterValue;
        return this;
    }

    unsetFilter(filterName: string) {
        delete this.filters[filterName];
    }

    withOrder(orderName: string, orderValue: any): ListQuery {
        return this.setOrder(orderName, orderValue);
    }

    setOrder(orderName: string, orderValue: any): ListQuery {
        this.orders[orderName] = orderValue;
        return this;
    }

    /**
     * Removes a single order from the orders map. If `orderName` is not provided, all orders are omitted.
     * @param {optional} orderName
     */
    unsetOrder(orderName?: string) {
        if (orderName) {
            delete this.orders[orderName];
        }
        else {
            for (let key in this.orders) {
                delete this.orders[key];
            }
        }
    }

    withPager(pager): ListQuery {
        this.pager = pager;
        return this;
    }

    getFullPath(): string {
        return this.urlPrefix + this.path;
    }

    buildParameters() {
        let params = {};

        if (this.pager) {
            Object.assign(params, {
                page: this.pager.pageNumber + 1, // the API page numbering starts from page one (1).
                itemsPerPage: this.pager.size
            });
        }

        if (this.filters) {
            Object.assign(params, this.filters);
        }

        if (this.orders) {
            for (let key in this.orders) {
                params['order[' + key + ']'] = this.orders[key];
            }
        }

        return params;
    }
}
