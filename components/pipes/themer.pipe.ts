import { Pipe, PipeTransform } from '@angular/core';

import { ThemerService } from '../../services/themer.service';


@Pipe({name: 'themer'})
export class DsThemerPipe implements PipeTransform {

    constructor(protected themer: ThemerService) {

    }

    transform(value: any, args: string[]): any {
        let defaultValue = args && (args.length > 0) ? args[0] : '';
        return this.themer.get(value, defaultValue);
    }
}