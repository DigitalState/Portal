import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DsEntityTranslationService} from '../../services/entity-translation.service';

/**
 * Use this pipe to extract a key/value structure from an object.
 * The best application of this would be in a ngFor where you need the `key` and `value` of
 * each item in your iterable separately.
 */
@Pipe({name: 'entityTranslate'})
export class DsEntityTranslatePipe implements PipeTransform {

    constructor(protected entityTranslation: DsEntityTranslationService) {

    }

    transform(value: any, args: string[]): any {
        // console.log('entityTranslate: ', value, args);
        return this.entityTranslation.getTranslation(value);
    }
}