import { Component, Injector } from '@angular/core';

import { GlobalState } from "../../global.state";

@Component({

})
export class DsPageComponent {

    /**
     * The pageTitle and pageSubtitle.
     */
    protected pageTitle: string;
    protected pageSubtitle: string;

    // Dependency-Injected objects

    protected globalState: GlobalState;

    constructor(protected injector: Injector) {
        this.globalState = this.injector.get(GlobalState);
    }

    ngOnInit() {
        if (this.pageTitle) {
            this.applyPageTitle();
        }
    }

    /**
     * Update the page title via a global-state notification. The function looks for the provided title string
     * first, if not provided it tries to use the `pageTitle` property. If none of those is set it exists and the
     * currently active title remains.
     *
     * @param title
     */
    applyPageTitle(title?: string) {
        let pageTitle = title || this.pageTitle;

        if (pageTitle) {
            setTimeout(() => {
                this.globalState.notifyDataChanged('menu.activeLink', {
                    'title': pageTitle
                });
            });
        }
    }
}