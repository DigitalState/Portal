
import { Injectable, TemplateRef } from '@angular/core';

@Injectable()
export class TemplateStorage {

    protected templates: Map<string, TemplateRef<any>> = new Map();

    public get(tplName: string) {
        return this.templates.get(tplName);
    }

    public set(tplName: string, tplRef: TemplateRef<any>) {
        this.templates.set(tplName, tplRef);
    }
}
