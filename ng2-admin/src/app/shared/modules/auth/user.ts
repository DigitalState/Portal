import { Persona } from './persona';

export class User {

    uuid: string;
    username: string;
    email: string;
    identity: string;
    identityUuid: string;
    roles: Array<string>;
    persona: Array<Persona>;

    /**
     * Contains the user identity information as retrieved `Individuals`, `Staff` or `Anonymous` API endpoints.
     * These are stored and loaded from localStorage as supplementary information
     */
    extra: any;

    constructor() {

    }
}