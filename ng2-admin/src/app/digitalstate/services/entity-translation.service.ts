
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {isObject} from 'util';

@Injectable()
export class DsEntityTranslationService {

    constructor(protected translate: TranslateService) {

    }

    propertyHasTranslation(value, property) {
        return property.translated === true
            && isObject(value)
            && value.hasOwnProperty(this.translate.currentLang)
    }

    getTranslation(value, property?) {
        if (property) {
            return this.propertyHasTranslation(value, property)
                ? value[this.translate.currentLang]
                : '';
        }
        else {
            return value.hasOwnProperty(this.translate.currentLang)
                ? value[this.translate.currentLang]
                : '';
        }

    }
}