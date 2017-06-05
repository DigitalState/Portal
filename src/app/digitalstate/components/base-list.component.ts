import {AfterViewInit, Component, Inject, ReflectiveInjector, TemplateRef, ViewChild} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

// import 'style-loader!../styles/style.scss';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from '../models/pager';
// import { Service } from '../models/service';
import { DsBaseEntityApiService } from '../services/base-entity-api.service';
import { ListQuery } from '../models/api-query';
import { MicroserviceConfig } from '../modules/microservice.provider';
import {Subject, Subscriber} from 'rxjs';
import { ObservableInput } from 'rxjs/Observable';

import 'rxjs/Rx';
import { forEach, isString } from 'lodash';

export class DsBaseEntityListComponent implements AfterViewInit {

    @ViewChild(DatatableComponent) datatable: DatatableComponent;
    @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
    @ViewChild('textCellTpl') textCellTpl: TemplateRef<any>;
    @ViewChild('actionsTpl') actionsCellTpl: TemplateRef<any>;

    rows = [];
    columns = [];
    query: ListQuery;
    pager = new Pager();

    // Todo: fetch the default page size from the AppState
    size = 10;

    /**
     * Static Datatable attributes
     * @type {object}
     */
    datatableAttributes = {
        columnMode: 'force',
        rowHeight: 'auto',
        headerHeight: 90,
        footerHeight: 50,
        externalPaging: true,
    };

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

    /**
     * The Enity API service is not injected into this base component class because
     * the API service configurations are Microservice-specific.
     */
    protected entityApiService: DsBaseEntityApiService<any>;

    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(protected translate: TranslateService,
                protected microserviceConfig: MicroserviceConfig) {
    }

    ngOnInit() {
        // Subscribe to language-change events
        this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.updateTranslations();
            this.refreshList();
        });

        this.entityMetadata = this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties;
        this.pager.size = this.size;

        // UI lifecycle
        this.setupUi();
        this.setupList();
        this.postSetupList();

        this.query = ListQuery
            .forUrl(this.microserviceConfig.settings.entrypoint.url, this.entityUrlPrefix)
            .withPager(this.pager);

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
     * Setup the UI.
     * This can be overridden by subclasses to further configure the UI.
     */
    protected setupUi() {
        forEach(this.datatableAttributes, (value, key) => {
            console.log(key, value);
            this.datatable[key] = value;
        });
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
        this.columns.forEach((column) => {
            column.propertyMetadata = this.entityMetadata[column.prop];
        });

        // Append the Actions column
        this.columns.push(
            { name: 'Actions', cellTemplate: this.actionsCellTpl, headerTemplate: this.headerTpl }
        );

        this.updateTranslations();
    }

    /**
     * Fetch the list using the Entity API Service.
     */
    protected refreshList() {
        let list = this.entityApiService.getList(this.query);

        list.subscribe((pagedData) => {
            this.pager = pagedData.pager;
            this.rows = pagedData.data;
        });
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
    setPage(pageInfo) {
        // this.query.pager.pageNumber = pageInfo.offset;
        this.pager.pageNumber = pageInfo.offset;
        this.refreshList();
    }

    /**
     * Dynamically update localized strings that are not rendered through the `translate` pipe.
     * This mainly applies to the ngx-datatable component.
     */
    protected updateTranslations() {
        // Update the localization strings of ngx-datatable
        this.datatable.messages = this.translate.instant('datatable');

        // Update the columns' headers
        this.columns.forEach((column) => {
            this.translate.get('ds.microservices.entity.property.' + column.prop).subscribe((translatedString) => {
                column.name = translatedString;
            });
        });

    }
}
