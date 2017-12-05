import { Pipe, PipeTransform } from '@angular/core';
import { DsStaticTranslationService } from '../../services/static-translation.service';

/**
 * Assuming translations are pre-loaded in all supported languages, you can use this pipe to load
 * a translation in a specific language that you pass in the first argument to the pipe.
 */
@Pipe({name: 'staticTranslate'})
export class DsStaticTranslatePipe implements PipeTransform {

    constructor(protected staticTranslate: DsStaticTranslationService) {

    }

    transform(value: any, args: string[]): any {
        let lang = args[0];
        let ts = this.staticTranslate.instant(lang, value);
        return ts;
    }
}