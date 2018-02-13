import { Injectable, Renderer2 } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { CmsApiService } from './cms.service';

import { AppState } from '../../app.service';

import { Observable } from 'rxjs/Observable';

import lodashGet from 'lodash/get';


const THEME_KEY_SUFFIX = '-theme';

@Injectable()
export class ThemerService {

    /** Color Scheme Presets */
    protected colorSchemes: any = {
        'light': 'Light',
        'dark': 'Dark',
    };

    protected renderer: Renderer2;

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
    init(renderer: Renderer2): void {
        this.renderer = renderer;
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
        const styleTagContent = this.generateThemeStyle();
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
     * Pick the value of a theme
     * @param propPath
     * @param themeKey
     */
    get(propPath: string, defaultValue?: string, themeKey: string = this.defaultThemeKey): string|null {
        try {
            //@Fixme @workaround: The hardcoded `en` property below in entity `data` object is used due to the translation requirement of the backend API.
            const theme = this.appState.get('appCmsContent', {})['datas'][themeKey]['en'];
            return lodashGet(theme, propPath, defaultValue);
        }
        catch (e) {
            return null;
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
    getAppliedTheme(themeKey: string = this.defaultThemeKey): any {
        try {
            return this.appState.get('appCmsContent', {})['datas'][themeKey];
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

    /**
     * Generate the contents of the style tag.
     * @Todo Refactor the responsibility of generating the contents of the Themer style tag to each SPA instead of having the ThemerService do it (Possibly a default Theme Generator can be in the shared between SPAs).
     *
     * @param themeKey
     * @return {string}
     */
    generateThemeStyle(themeKey: string = this.defaultThemeKey) {
        const breakpoints = this.appState.get('config').breakpoints;
        let style = '';

        // Global

        if (this.get('global.bgColor')) {
            style += `
                body, main {
                   background-color: ${this.get('global.bgColor')};
                }
            `;
        }

        if (this.get('global.textColor')) {
            style += `
                body, 
                main,
                .content-top > *,
                .auth-block {
                    color: ${this.get('global.textColor')} !important;
                }
            `;
        }

        // Header

        if (this.get('header.bgColor')) {
            style += `
                .page-top {
                    background-color: ${this.get('header.bgColor')};
                }
            `;
        }

        if (this.get('header.textColor')) {
            style += `
                .page-top,
                .page-top a {
                    color: ${this.get('header.textColor')};
                }
            `;
        }

        if (this.get('header.linkHoverColor')) {
            style += `
                .page-top a:hover {
                    color: ${this.get('header.linkHoverColor')} !important;
                }
            `;
        }

        if (this.get('header.dropdownBgColor')) {
            style += `
                .page-top .side-menu .al-dropdown.show .dropdown-toggle,
                .page-top .side-menu .al-dropdown ul.dropdown-menu {
                    background-color: ${this.get('header.dropdownBgColor')} !important;
                }
            `;
        }

        if (this.get('header.dropdownTextColor')) {
            style += `
                .page-top .side-menu .al-dropdown.show a {
                    color: ${this.get('header.dropdownTextColor')} !important;
                }
            `;
        }

        if (this.get('header.dropdownHighlight')) {
            style += `
                .page-top .side-menu .al-dropdown ul.dropdown-menu .dropdown-item:hover {
                    background-color: ${this.get('header.dropdownHighlight')} !important;
                }
            `;
        }

        if (this.get('header.logoMaxWidth')) {
            style += `
                .page-top a.al-logo img {
                    max-width: ${this.get('header.logoMaxWidth')}px !important;
                }
            `;
        }

        if (this.get('header.logoMaxWidthSm')) {
            style += `
                @media (max-width: ${breakpoints.xs}px) {
                    .page-top a.al-logo img {
                        max-width: ${this.get('header.logoMaxWidthSm')}px !important;
                    }
                }
            `;
        }

        if (this.get('header.showProfilePic')) {
            style += `
                .page-top .profile-dropdown .my-account-text { display: none; }
                .page-top .profile-dropdown img.profile-pic { display: block; }
                .page-top .profile-dropdown .user-identity { display: block; }
            `;
        }
        else {
            style += `
                .page-top .profile-dropdown .my-account-text { display: block; }
                .page-top .profile-dropdown img.profile-pic { display: none; }
                .page-top .profile-dropdown .user-identity { display: none; }
            `;
        }

        // Sidebar

        if (this.get('sidebar.bgColor')) {
            style += `
                .al-sidebar {
                    background-color: ${this.get('sidebar.bgColor')};
                }
            `;
        }

        if (this.get('sidebar.textColor')) {
            style += `
                .al-sidebar > *, 
                .al-sidebar a.al-sidebar-list-link, 
                .al-sidebar a.al-sidebar-list-link b {
                    color: ${this.get('sidebar.textColor')} !important;
                }
            `;
        }

        if (this.get('sidebar.linkHoverColor')) {
            style += `
                .al-sidebar a.al-sidebar-list-link:hover,
                .al-sidebar a.al-sidebar-list-link:hover b {
                    color: ${this.get('sidebar.linkHoverColor')} !important;
                }
                .al-sidebar .sidebar-hover-elem {
                    background: ${this.get('sidebar.linkHoverColor')};
                }
            `;
        }

        // Login and Registration pages

        if (this.get('auth.formBgColor')) {
            style += `
                .auth-block {
                    background-color: ${this.get('auth.formBgColor')};
                }
            `;
        }

        if (this.get('auth.formTextColor')) {
            style += `
                .auth-block {
                    color: ${this.get('auth.formTextColor')} !important;
                }
            `;
        }

        return style;
    }
}