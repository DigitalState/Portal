import { Injectable, Renderer2 } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { CmsApiService } from './cms.service';

import { AppState } from '../../app.service';

import { Observable } from 'rxjs/Observable';

import lodashGet from 'lodash/get';
import reduce from 'lodash/reduce';
import flatten from 'flat';

const THEME_KEY_SUFFIX = '-theme';

@Injectable()
export class ThemerService {

    /** Color Scheme Presets */
    protected colorSchemes: any = {
        'light': 'Light',
        'dark': 'Dark',
    };

    protected renderer: Renderer2;
    protected styleGenerator: BaseThemerStyleGenerator;

    protected defaultThemeKey: string;

    protected themerStyleNode: any;

    constructor(protected appState: AppState,
                protected translate: TranslateService,
                protected cms: CmsApiService) {

        this.defaultThemeKey = this.getSpaThemeKey();
    }

    /**
     * Called by root component that loads the Renderer and passes to Themer in order to give it various DOM utilities.
     * @param renderer
     */
    init(renderer: Renderer2, styleGenerator: BaseThemerStyleGenerator): void {
        this.renderer = renderer;
        this.styleGenerator = styleGenerator;
    }

    /**
     * Getter for Color Schemes map.
     * @return {any}
     */
    getColorSchemes(): any {
        return this.colorSchemes;
    }

    /**
     * Called by the component responsible for loading Theme data from CMS and storing in AppState.
     */
    onThemeDataLoaded(): void {
        this.reloadTheme();
    }

    reloadTheme() {
        // Set color-scheme using a `body` class. The default color scheme is `light`
        const colorScheme = this.get('global.colorScheme', 'light');

        // First, remove existing themer classes from `body` tag
        if (!jQuery(document.body).hasClass(colorScheme)) {
            Object.keys(this.getColorSchemes()).forEach(key => {
                this.renderer.removeClass(document.body, key);
            });
        }

        this.renderer.addClass(document.body, colorScheme);

        // First, remove the current Themer `<style>` tag
        this.removeThemerStyle();

        // Apply new Themer styles
        const theme = this.getTheme();
        const styleTagContent = this.styleGenerator.generateThemeStyle(theme);
        this.createThemerStyle(styleTagContent);
    }

    /**
     *
     * @param spaId
     * @return {string}
     */
    getSpaThemeKey(spaId: string = this.appState.get('config').spaId): string {
        return spaId + THEME_KEY_SUFFIX;
    }

    /**
     * Pick a single style value from a theme
     * @param propPath
     * @param themeKey
     */
    get(propPath: string, defaultValue?: string, themeKey: string = this.defaultThemeKey): any {
        try {
            //@Fixme @workaround: The hardcoded `en` property below in entity `data` object is used due to the translation requirement of the backend API.
            const theme = this.getTheme(themeKey);
            return lodashGet(theme, propPath, defaultValue);
        }
        catch (error) {
            console.warn(`Cannot get Themer style value for ${propPath}`, error);
            return defaultValue;
        }
    }

    /**
     *
     * @param themeKey
     * @return {Observable<any>}
     */
    loadTheme(themeKey: string = this.defaultThemeKey): Observable<any> {
        return this.cms.getEntityBySlug(themeKey, 'data');
    }

    /**
     *
     * @param themeKey
     * @return {any}
     */
    getTheme(themeKey: string = this.defaultThemeKey): any {
        try {
            return this.appState.get('appCmsContent', {})['datas'][themeKey]['en'];
        }
        catch (e) {
            return null;
        }
    }

    /**
     * Update the theme data that is cached in the AppState along with other CMS content
     * @param themeKey
     * @param themeData
     */
    updateAppliedTheme(themeKey: string = this.defaultThemeKey, themeData: any): void {
        try {
            let appCmsContent = this.appState.get('appCmsContent', {});
            appCmsContent['datas'][themeKey] = themeData;
            this.appState.set('appCmsContent', appCmsContent);
        }
        catch (e) {
            console.warn(e);
        }
    }

    /**
     *
     * @param themeKey
     * @param themeData
     * @return {Observable<any>}
     */
    saveTheme(themeKey: string, themeData: any): Observable<any> {
        // @Fixme @workaround: Wrap theme data in all language keys due the API translation requirement !! :s
        themeData = this.translate.getLangs().reduce((accum: any, current: any, index) => {
            accum[current] = themeData;
            return accum;
        }, {});

        // First, update currently applied theme
        this.updateAppliedTheme(themeKey, themeData);

        return this.cms.saveData(themeKey, themeData);
    }

    removeThemerStyle() {
        if (this.themerStyleNode) {
            const themerStyleNodeParent = this.renderer.parentNode(this.themerStyleNode);
            this.renderer.removeChild(themerStyleNodeParent, this.themerStyleNode);
            this.themerStyleNode = undefined;
        }
    }

    createThemerStyle(styleTagText: string) {
        this.themerStyleNode = this.renderer.createElement('style');
        this.renderer.setAttribute(this.themerStyleNode, 'id', 'themer');

        const styleText = this.renderer.createText(styleTagText);

        this.renderer.appendChild(this.themerStyleNode, styleText);
        this.renderer.appendChild(document.body, this.themerStyleNode);
    }
}


/**
 * Generate the contents of the Themer style tag.
 */
export class BaseThemerStyleGenerator {

    /** CSS breakpoints from the app.config */
    protected breakpoints: any;

    constructor(protected appState: AppState,
                protected themer: ThemerService) {

        this.breakpoints = this.appState.get('config').breakpoints;
    }

    /**
     * Build the entire style set of a theme.
     * This method flattens the theme object and calls `generatePropertyStyle()` method
     * on individual style properties then accumulates and returns the output.
     *
     * @param theme
     * @return {string}
     */
    generateThemeStyle(theme: any): string {
        const flattenedTheme = flatten(theme) || {};
        return reduce(flattenedTheme, (accum, propValue, propKey) => {
            const propStyle = this.generatePropertyStyle(propKey, propValue);
            return propStyle ? (accum + propStyle + '\n') : accum;
        }, '');
    }

    /**
     * Render the styles of a single style property given it's value.
     *
     * @param key Flattened path of the property as in `prop.subProp`.
     * @param value
     * @return {any}
     */
    generatePropertyStyle(key: string, value: any): string {
        switch(key) {

            // Global

            case 'global.bgColor':
                return `
                body, main {
                   background-color: ${value};
                }`;

            case 'global.textColor':
                return `
                body, 
                main,
                .content-top > *,
                .auth-block {
                    color: ${value} !important;
                }`;

            // Header

            case 'header.bgColor':
                return `
                .page-top {
                    background-color: ${value};
                }`;

            case 'header.textColor':
                return `
                .page-top,
                .page-top a {
                    color: ${value};
                }`;

            case 'header.linkHoverColor':
                return `
                .page-top a:hover {
                    color: ${value} !important;
                }`;

            case 'header.dropdownBgColor':
                return `
                .page-top .side-menu .al-dropdown.show .dropdown-toggle,
                .page-top .side-menu .al-dropdown ul.dropdown-menu {
                    background-color: ${value} !important;
                }`;

            case 'header.dropdownTextColor':
                return `
                .page-top .side-menu .al-dropdown.show a {
                    color: ${value} !important;
                }`;

            case 'header.dropdownHighlight':
                return `
                .page-top .side-menu .al-dropdown ul.dropdown-menu .dropdown-item:hover {
                    background-color: ${value} !important;
                }`;

            case 'header.logoMaxWidth':
                return `
                .page-top a.al-logo img {
                    max-width: ${value}px !important;
                }`;

            case 'header.logoMaxWidthSm':
                return `
                @media (max-width: ${this.breakpoints.xs}px) {
                    .page-top a.al-logo img {
                        max-width: ${value}px !important;
                    }
                }`;

            case 'header.showProfilePic':
                if (value === false) {
                    return `
                    .page-top .profile-dropdown .my-account-text { display: block; }
                    .page-top .profile-dropdown img.profile-pic { display: none; }
                    .page-top .profile-dropdown .user-identity { display: none; }`;
                }
                else {
                    return `
                    .page-top .profile-dropdown .my-account-text { display: none; }
                    .page-top .profile-dropdown img.profile-pic { display: block; }
                    .page-top .profile-dropdown .user-identity { display: block; }`;
                }

            // Sidear

            case 'sidebar.bgColor':
                return `
                .al-sidebar {
                    background-color: ${value};
                }`;

            case 'sidebar.textColor':
                return `
                .al-sidebar > *, 
                .al-sidebar a.al-sidebar-list-link, 
                .al-sidebar a.al-sidebar-list-link b {
                    color: ${value} !important;
                }`;

            case 'sidebar.linkHoverColor':
                return `
                .al-sidebar a.al-sidebar-list-link:hover,
                .al-sidebar a.al-sidebar-list-link:hover b {
                    color: ${value} !important;
                }
                .al-sidebar .sidebar-hover-elem {
                    background: ${value};
                }`;

            // Login and Registration pages

            case 'auth.formBgColor':
                return `
                .auth-block {
                    background-color: ${value};
                }`;

            case 'auth.formTextColor':
                return `
                .auth-block {
                    color: ${value} !important;
                }`;

            case 'auth.logoMaxWidth':
                return `
                .header-block a.al-logo img {
                    max-width: ${value}px !important;
                }`;

            default:
                return null;
        }
    }
}