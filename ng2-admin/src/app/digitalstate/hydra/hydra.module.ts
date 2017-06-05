
import { Injectable } from '@angular/core';

@Injectable()
export class HydraService {
    protected entrypoints: { [id: string]: Entrypoint } = {};
    protected properties: { [id: string]: Property } = {};
    protected entities: { [id: string]: Entity } = {};

    public title: string = 'Hydra service';

    constructor() {
        console.log(`Constructing ${this.title}`);
        this.loadEntrypoint();
    }

    public loadEntrypoint() {
        this.entrypoints['foo'] = { 'entities': [] };
    }
}

class Entrypoint {
    public entities: Entity[] = [];
}

class Entity {
    public properties: Property[] = [];
}

class Property {

}
