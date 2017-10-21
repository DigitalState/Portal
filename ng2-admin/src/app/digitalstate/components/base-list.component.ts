import { AfterViewInit, Injector, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

// import 'style-loader!../styles/style.scss';
// import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager, PagingMode } from '../models/pager';

import { ListQuery } from '../models/api-query';
import { MicroserviceConfig } from '../../shared/providers/microservice.provider';
import { DsEntityCrudComponent } from '../../shared/components/base-entity-crud-component';

import 'rxjs/Rx';
import { Subject, Subscriber } from 'rxjs';
import { ObservableInput } from 'rxjs/Observable';
import { forEach, isString, remove } from 'lodash';

export class DsBaseEntityListComponent extends DsEntityCrudComponent implements AfterViewInit {

    // @ViewChild(DatatableComponent) datatable: DatatableComponent;
    @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
    @ViewChild('textCellTpl') textCellTpl: TemplateRef<any>;
    @ViewChild('actionsTpl') actionsCellTpl: TemplateRef<any>;

    rows: Array<any> = [];
    columns = [];
    sorts = [];
    query: ListQuery;
    pager = new Pager();
    pagingMode: PagingMode = PagingMode.APPEND;

    // progress bar bindings
    loading: boolean;

    // Todo: fetch the default page size from the AppState
    size = 10; // list page size

    // infinite scroll settings
    scrollDebounceTime: number = 1000;
    timeSinceLastScroll: number = 0;

    // /**
    //  * Static Datatable attributes
    //  * @type {object}
    //  */
    /** @deprecated */
    datatableAttributes = {
        columnMode: 'force',
        rowHeight: 'auto',
        headerHeight: 90, // overriden in list components that don't have column filters
        footerHeight: 50,
        externalPaging: true,
        externalSorting: true,
    };

    /**
     * Determines the default visibilty of action buttons
     * @type { [s: string]: boolean }
     */
    actions: { [s: string]: boolean } = {
        show: true,
        refresh: true,
        create: true,
        edit: true,
    };

    /**
     * The parent entity object (if any). This applies when the subclassing component targets
     * an entity that is at the `many` end of a one-to-many relationship with the parent entity.
     */
    protected entityParent: any;

    /**
     * The URL portion of the REST resource URL that refers to the entity's collection.
     * @type {string}
     */
    protected entityUrlPrefix: string;

    /**
     * Filtering model and stream
     */
    protected filters = {};
    protected filterStream = new Subject<any>();

    /**
     * A shortcut to the entity's metadata from the MicroserviceConfig.
     */
    protected entityMetadata = {};

    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    /**
     * Interface language holder.
     */
    lang: string;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(injector: Injector, protected microserviceConfig: MicroserviceConfig) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();

        this.lang = this.translate.currentLang;

        // Subscribe to language-change events
        this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.lang = event.lang;
            this.updateTranslations(event.lang);
            this.refreshList();
        });

        this.entityMetadata = this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties;
        this.pager.size = this.size;

        // UI lifecycle
        this.setupUi();
        this.setupList();
        this.postSetupList();

        this.setupQuery();

        // Configure the column-filtering stream
        this.filterStream
            .distinctUntilChanged(
                // distinct comparer: check whether both filter property and value are identical
                (obj1, obj2) => (obj1.filterProperty === obj2.filterProperty && obj1.filterValue === obj2.filterValue)
            )
            .map((obj) => this.assignFilterValue(obj))
            .debounceTime(500)
            .subscribe(() => this.doFilter());

        // Run the initial fetch query
        this.setPage({offset: 0});
    }

    ngOnDestroy() {
        // Unsubscribe from language-change events
        this.languageChangeSubscriber.unsubscribe();
    }

    ngAfterViewInit() {

    }

    /**
     * Initialize and build the remote service query. Subclasses can use this to further configure the query object.
     */
    protected setupQuery(): void {
        this.query = ListQuery
            .forUrl(this.microserviceConfig.settings.entrypoint.url, this.entityUrlPrefix)
            .withPager(this.pager);
    }

    /**
     * Setup the UI.
     * This can be overridden by subclasses to further configure the UI.
     */
    protected setupUi() {
        // forEach(this.datatableAttributes, (value, key) => {
        //     this.datatable[key] = value;
        // });
    }

    /**
     * Called on subclasses to configure the Data-table columns when the component is initialized
     */
    protected setupList() {}

    /**
     * Perform additional configurations on the Data-table settings after subcalsses complete their
     * own configurations in `setupList`;
     */
    protected postSetupList() {
        // this.columns.forEach((column) => {
        //     column.propertyMetadata = this.entityMetadata[column.prop];
        // });
        //
        // // Append the Actions column
        // this.columns.push(
        //     { name: 'ds.microservices.entity.action.actions', cellTemplate: this.actionsCellTpl, headerTemplate: this.headerTpl, sortable: false }
        // );

        this.updateTranslations(this.translate.currentLang);
    }

    /**
     * Fetch the list using the Entity API Service.
     */
    protected refreshList() {
        this.loading = true;
        let list = this.entityApiService.getList(this.query);

        list.subscribe((pagedData) => {
            this.pager = pagedData.pager;

            switch (this.pagingMode) {
                case PagingMode.REPLACE:
                    this.rows = this.preprocessRowsData(pagedData.data);
                    break;

                case PagingMode.APPEND:
                    this.rows = this.rows.concat(this.preprocessRowsData(pagedData.data));
                    break;
            }

            this.loading = false;
        });
    }

    protected preprocessRowsData(fetchedData): Array<any> {
        // Add metadata container including list actions
        let rows;
        if (fetchedData) {
            rows = fetchedData.map((row) => {
                row['_'] = {
                    'actions': this.actions
                };
                return row;
            }).filter((row) => {
                // Filter out lists with missing title translation
                let condition = row.hasOwnProperty('title') && row.title.hasOwnProperty(this.translate.currentLang);
                return condition;
            });
        }

        return rows;
    }

    /**
     * A callback for the observed `onFilterUpdate` event of the column header component.
     * This method queues the received filtering updates into the observable filter stream.
     * @param filterData {object} This object contains the following properties:
     *        - column: The ngx-datatable column object that hosts the filter's input control.
     *        - event: The DOM event resulting from the user interaction with the control.
     */
    protected onFilterValueChange(filterData) {
        const filterProperty = filterData.column.prop;
        const filterValue = filterData.event.target.value;
        this.filterStream.next({ filterProperty, filterValue });
    }

    /**
     * Update the filtering model using the provided filter value.
     * @param obj Property and value of the filter
     * @returns {any} obj as received from the stream
     */
    protected assignFilterValue(obj): ObservableInput<any> {
        console.log('assignFilterValue: ', obj);
        this.filters[obj.filterProperty] = obj.filterValue;
        return obj;
    }

    /**
     * This is the subscriber to the filter stream that actually refreshes the list
     */
    protected doFilter() {
        Object.keys(this.filters).forEach((filterProperty) => {
            const filterValue = this.filters[filterProperty];
            if (filterValue == null || (isString(filterValue) && filterValue.length === 0)) {
                delete this.filters[filterProperty];
                this.query.unsetFilter(filterProperty);
            }
            else
            {
                this.filters[filterProperty] = filterValue;
                this.query.setFilter(filterProperty, this.filters[filterProperty]);
            }
        });

        console.log(this.filters);

        // Reset query to the first page before refreshing the list
        this.query.pager.pageNumber = 0; // remember page numbers are zero-based

        // Whenever the filter changes, always go back to the first page
        // this.datatable.offset = 0;

        this.refreshList();
    }

    /**
     * Populate the table with new data based on the page number
     * @param pager The pager to select
     */
    protected setPage(pageInfo) {
        // this.query.pager.pageNumber = pageInfo.offset;
        this.pager.pageNumber = pageInfo.offset;
        this.refreshList();
    }

    /**
     * Remove from the list one or more items that match the provided criteria.
     * @param criteria An object of property criteria to filter the list by.
     *        Example: {'uuid': '52d4797d-aeba-4933-8775-e44901cf5f2d'}
     */
    protected removeItem(criteria: any) {
        remove(this.rows, criteria);
    }

    protected fetchNextPage() {
        if (this.pager.pageNumber < this.pager.totalPages) {
            console.log('fetchNextPage: new pager page number', this.pager.pageNumber);
            this.setPage({ offset: this.pager.pageNumber + 1 });
        }
    }

    /**
     *
     * @param {object} sortEvent The sort event object provided by ngx-datatable. It looks as follows:
     *  {
     *      column: Object, // The sort-target column
     *      prevValue: "asc" | "desc" | undefined,
     *      newValue: "asc" | "desc"
     *  }
     */
    protected onSort(sortEvent: {column: any, prevValue: string, newValue: string}) {
        console.log('base-list.component::onSort', sortEvent);
        if (sortEvent.column.prop) {
            this.query.unsetOrder();
            this.query.setOrder(sortEvent.column.prop, sortEvent.newValue);
            this.refreshList();
        }
    }

    /**
     * Infinite scroll (scroll-down) handler that is triggered when the list is scrolled down.
     * Based on window scrollPosition, it determines whether the user has scrolled to the bottom of the page.
     * A debounce guard is used to abort further processing if triggered multiple times within the debounce time.
     * A loading guard is also employed.
     *
     * @param scrollEvent
     */
    onScrollDown(scrollEvent: any) {
        const timeNow = new Date().getTime();

        if (!this.loading && (timeNow > (this.timeSinceLastScroll + this.scrollDebounceTime))) {
            const scrollHeight = jQuery(document).height();
            const scrollPosition = jQuery(window).height() + jQuery(window).scrollTop();

            if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
                // When scroll hits bottom of the page
                this.timeSinceLastScroll = timeNow;
                this.fetchNextPage();
            }
        }
    }

    /**
     * Dynamically update localized strings that are not rendered through the `translate` pipe.
     * This mainly applies to the ngx-datatable component.
     */
    protected updateTranslations(newLang: string): void {
        // Update the localization strings of ngx-datatable
        // this.datatable.messages = this.translate.instant('datatable');

        // // Update the columns' headers
        // this.columns.forEach((column) => {
        //     // For translation, use the column name if available; otherwise, construct the translation string
        //     // from the column `prop` value
        //     let columnLabel = column.name ? column.name : 'ds.microservices.entity.property.' + column.prop;
        //     this.translate.get(columnLabel).subscribe((translatedString) => {
        //         column.name = translatedString;
        //     });
        // });

    }
}
