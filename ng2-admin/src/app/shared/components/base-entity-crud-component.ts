import { Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';

import { GlobalState } from "../../global.state";
import { AppState } from '../../app.service';

import { DsPageComponent } from './page-component';
import { DsBaseEntityApiService } from '../services/base-entity-api.service';
import { Link } from '../../digitalstate/models/link';

import 'rxjs/Rx';
import { Subscriber} from 'rxjs/Subscriber';

import isObject from 'lodash/isObject';

export abstract class DsEntityCrudComponent extends DsPageComponent {

    /**
     * Set to TRUE in ngOnInit to indicate that the component has been initialized.
     */
    protected isInitialized: boolean;

    /**
     * The pageTitle and pageSubtitle.
     */
    protected pageTitle: string;
    protected pageSubtitle: string;

    /**
     * The entity object.
     */
    protected entity;

    /**
     * The URL portion of the REST resource URL that refers to the entity's collection.
     * @type {string}
     */
    protected entityUrlPrefix: string;

    protected backLink: Link;

    /**
     * The title of the primary card in the page.
     * @type {string}
     */
    protected headerTitle: string;

    /**
     * The parent entity object (if any). This applies when the subclassing component targets
     * an entity that is at the `many` end of a one-to-many relationship with the parent entity.
     */
    protected entityParent;
    protected entityParentUrlPrefix: string;

    /**
     * The Router parameter that points to the value of the entity parent's identifier.
     */
    protected entityParentUrlParam: string;

    /**
     * App configurations retrieved from the AppState
     */
    protected config: any;

    /**
     * The Enity API service is not injected into this base component class because
     * the API service configurations are Microservice-specific.
     */
    protected entityApiService: DsBaseEntityApiService<any>;
    protected translate: TranslateService;

    protected router: Router;
    protected route: ActivatedRoute;
    protected location: Location;
    protected toastr: ToastsManager;
    protected globalState: GlobalState;
    protected appState: AppState;

    /**
     * @placeholder
     * Use to confirm route deactivation on a CRUD component subclass
     */
    public confirmBeforeRouteDeactivation: boolean;


    constructor(protected injector: Injector) {
        super(injector);

        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.globalState = this.injector.get(GlobalState);
        this.appState = this.injector.get(AppState);
        this.location = injector.get(Location);
        this.translate = injector.get(TranslateService);
        this.toastr = injector.get(ToastsManager);

        this.config = this.appState.get('config');
    }

    ngOnInit() {
        super.ngOnInit()
        this.isInitialized = true;
    }

    /**
     * For subclasses to be notified of the completion of entity preparation.
     */
    protected generateBackLink(): Link {
        if (this.entityParent) {
            // && this.entityParent.hasOwnProperty('title')) {
            // && this.entityParent.title.hasOwnProperty(this.translate.currentLang)) {

            // Create a new back link instance only if none has been initialized by the child component
            // This helps child components define the text of the link and lets this function determine the route
            if (!this.backLink) {
                this.backLink = new Link;
            }

            this.backLink.routerLink = ['/', 'pages', this.entityParentUrlPrefix, this.entityParent.uuid, 'show'];

            if (this.entityParent.hasOwnProperty('title'))
            {
                this.backLink.text = this.entityParent.title[this.translate.currentLang];
            }
        }

        return this.backLink;
    }

    /**
     * Create and return an empty BackLink instance. Subclasses can override this to customize it's behaviour.
     * @return {Link}
     */
    protected getEmptyBackLink(): Link {
        return new Link;
    }

    /**
     * Checks `entity` for property `propertyName` and returns its translated value if applicable.
     * Otherwise, the value is returned as is or NULL if property does not exist in `entity`
     *
     * @param entity
     * @param propertyName
     * @return {any}
     */
    protected getTranslatedPropertyValue(entity: object, propertyName: string): any {
        if (isObject(entity)) {
            if (isObject(entity[propertyName]) && entity[propertyName][this.translate.currentLang]) {
                return entity[propertyName][this.translate.currentLang];
            }
            else {
                return entity[propertyName];
            }
        }
    }
}
