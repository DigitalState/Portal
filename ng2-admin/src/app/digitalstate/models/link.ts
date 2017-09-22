/**
 * An object used to build a Router link.
 */
export class Link {
    routerLink: Array<string>;
    text: string;

    constructor(routerLink?: Array<string>, text?: string) {
        this.routerLink = routerLink;
        this.text = text;
    }
}
