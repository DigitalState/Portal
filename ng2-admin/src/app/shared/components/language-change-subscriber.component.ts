import { Injector } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { Subscriber } from 'rxjs/Subscriber';

/**
 * This is a generic language-change subscriber that can be extended by components to receive
 * language-change events. It also sets a `lang` property so templates can directly bind to it.
 */
export class DsLanguageChangeSubscriber {

    protected translate: TranslateService;
    protected lang: string;
    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    constructor(injector: Injector) {
        this.translate = injector.get(TranslateService);
    }

    ngOnInit() {
        this.lang = this.translate.currentLang;

        // Subscribe to language-change events
        this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.lang = this.translate.currentLang;
            this.onLanguageChange(event.lang);
        });
    }

    ngOnDestroy() {
        if (this.languageChangeSubscriber) {
            this.languageChangeSubscriber.unsubscribe();
        }
    }

    /**
     * Called when a language change occurs. Subclasses can override this to perform various tasks.
     * @param lang
     */
    protected onLanguageChange(lang: string) {}
}