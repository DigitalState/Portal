
import { BaseThemerStyleGenerator } from '../../shared/services/themer.service';

/**
 * Generate custom Themer styles by overriding the base generator.
 */
export class ThemerStyleGenerator extends BaseThemerStyleGenerator {

    /**
     * Example of how to override base style properties
     * @param key
     * @param value
     * @return {string}
     */
    // generatePropertyStyle(key: string, value: any): string {
    //     switch(key) {
    //         case 'header.bgColor':
    //             return `
    //             .some-dummy-class {
    //                background-color: ${value};
    //             }`;
    //
    //         default:
    //             return super.generatePropertyStyle(key, value);
    //     }
    // }
}