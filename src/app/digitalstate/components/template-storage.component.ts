
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TemplateStorage } from '../services/template-storage.service';

@Component({
    selector: 'template-storage',
    templateUrl: '../templates/template-storage.template.html'
})
export class TemplateStorageComponent {

    @ViewChild('datatableCellHeader') datatableCellHeader: TemplateRef<any>;
    @ViewChild('datatableCellText') datatableCellText: TemplateRef<any>;
    @ViewChild('datatableCellActions') datatableCellActions: TemplateRef<any>;

    constructor(protected templateStorage: TemplateStorage) {

    }

    ngAfterViewInit() {
        this.templateStorage.set('datatableCellHeader', this.datatableCellHeader);
        this.templateStorage.set('datatableCellText', this.datatableCellText);
        this.templateStorage.set('datatableCellActions', this.datatableCellActions);
    }
}
