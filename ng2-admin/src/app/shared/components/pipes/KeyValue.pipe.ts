import { Pipe, PipeTransform } from '@angular/core';

/**
 * Use this pipe to extract a key/value structure from an object.
 * The best application of this would be in a ngFor where you need the `key` and `value` of
 * each item in your iterable separately.
 */
@Pipe({name: 'keyValue'})
export class KeyValuePipe implements PipeTransform {
    transform(obj, args: string[]): any {
        let items = [];
        for (let key in obj) {
            items.push({key: key, value: obj[key]});
        }
        return items;
    }
}