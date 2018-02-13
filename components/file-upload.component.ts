import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AppState } from '../../app.service';

import moment from 'moment';
import { Subscriber } from "rxjs/Subscriber";


@Component({
    selector: 'ds-file-upload',
    'template': `
		<input #fileInput type="file" (change)="onFileChange($event)" class="d-none">
        <button type="button" (click)="onButtonClick($event)" class="btn btn-primary">{{ 'general.chooseFile' | translate }} ...</button>
    `
})
export class DsFileUploadComponent {

    @Output('onFileChange') fileChangeEmitter = new EventEmitter<any>();
    @Output('onButtonClick') buttonClickEmitter = new EventEmitter<any>();

    @ViewChild('fileInput') fileInputRef:ElementRef;

    constructor(protected appState: AppState,
                protected translate: TranslateService) {

    }

    ngOnInit() {

    }

    onFileChange(event) {
        this.fileChangeEmitter.emit(event);
    }

    onButtonClick(event) {
        // Reset the value of the file input field so it can trigger file-change events
        // Note: this only works in modern browsers (and IE11+)
        this.fileInputRef.nativeElement.value = null;

        jQuery(this.fileInputRef.nativeElement).trigger('click');
        this.buttonClickEmitter.emit(event);
    }
}