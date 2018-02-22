import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


/**
 * Assuming translations are pre-loaded in all supported languages the following service and pipe
 * can be used to translate keys in specific languages.
 */
@Injectable()
export class DsStaticTranslationService {

    constructor(protected translate: TranslateService) {

    }

    /**
     * Fetch the translation of the provided `key` in a specific language `lang`.
     * Additional parameters can be passed in `interpolateParams`.
     *
     * @param lang Language key, for example 'en', 'fr', etc...
     * @param key Translation key
     * @param interpolateParams
     * @returns {any}
     * @see TranslateService::instant
     */
    public instant(lang: string, key: string, interpolateParams?: Object): string | any {
        return this.translate.getParsedResult(this.translate.translations[lang], key, interpolateParams);
    }

    /**
     * Convenience method to fetch the translations of `key` in all languages.
     *
     * @param key Translation key
     * @param Optional interpolateParams
     * @return {[lang]: translatedValue}
     */
    public instantAll(key: string, interpolateParams?: Object): any {
        let translations = this.translate.getLangs().reduce((accum, lang) => {
            accum[lang] = this.instant(lang, key, interpolateParams);
            return accum;
        }, {});

        return translations;
    }
}