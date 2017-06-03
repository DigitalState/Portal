/**
 * An object used to get pager information from the server
 */
export class Service {
    uuid: string;
    title: string;
    presentation: string;
    form: string;
    description: string;

    constructor(uuid: string, title: string, presentation: string, form: string, description: string) {
        this.uuid = uuid;
        this.title = title;
        this.presentation = presentation;
        this.form = form;
        this.description = description;
    }
}
