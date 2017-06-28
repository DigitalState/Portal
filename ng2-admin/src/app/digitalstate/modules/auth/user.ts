import { Persona } from './persona';

export class User {

    username: string;
    identity: string;
    identityUuid: string;
    roles: Array<string>;
    persona: Array<Persona>;

    constructor() {

    }


}