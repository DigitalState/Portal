import { Pipe, PipeTransform } from '@angular/core';
import isEmpty from 'lodash/isEmpty';

/**
 * Use this pipe to verify whether a variable is an empty.
 * @see https://lodash.com/docs/#isEmpty
 */
@Pipe({name: 'isEmpty'})
export class IsEmpty implements PipeTransform {
    transform(obj, args: string[]): any {
        return isEmpty(obj);
    }
}

/**
 * Reverse of IsEmpty
 */
@Pipe({name: 'isNotEmpty'})
export class IsNotEmpty implements PipeTransform {
    transform(obj, args: string[]): any {
        return !isEmpty(obj);
    }
}