import { Component, ElementRef, EventEmitter, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';

import { FormioApiService } from '../../services/formio-api.service';
import { FormioController } from './formio-controller';

@Component({
    selector: 'formio-modal-frame-component',
    styleUrls: [('../../styles/formio-modal-frame.scss')],
    templateUrl: '../../templates/formio-modal-frame.html',
    host: {
        class: 'formio-modal-frame-component'
    },
    encapsulation: ViewEncapsulation.None
})

export class FormioModalFrameComponent implements OnInit {
    @ViewChild('iframe') iframe: ElementRef;

    modalHeader: string;
    modalBreadcrumbs: string;
    modalContent: string = ``;

    protected formioController: FormioController;
    protected commChannel = 'ds.formio';
    protected windowId: string = 'wID-' + (Math.random() + '').substr(2);
    protected frameSrc: SafeResourceUrl;

    protected isFormioFormReady: boolean = false;

    constructor(private activeModal: NgbActiveModal,
                protected translate: TranslateService,
                protected toastr: ToastsManager,
                protected formioApiService: FormioApiService,
                domSanitizer: DomSanitizer) {
        this.frameSrc = domSanitizer.bypassSecurityTrustResourceUrl('formio.html?windowId=' + this.windowId);
    }

    ngOnInit() {
    }

    public getWindowId(): string {
        return this.windowId;
    }

    public getIFrame(): ElementRef {
        return this.iframe;
    }

    public setFormioController(formioController: FormioController) {
        this.formioController = formioController;

    }

    public setBreadcrumbs(breadcrumbs: Array<string>) {
        breadcrumbs.push(this.translate.instant('general.form'));
        this.modalBreadcrumbs = breadcrumbs.join(' › ');
    }

    closeModal(action?: any) {
        this.activeModal.close(action);
    }

    protected switchLanguage(lang) {
        this.sendMessage('switchLanguage', lang);
    }

    /**
     * Window messaging triage.
     * First, filter-out messages that are addressed to this window using proper channel and tag.
     */
    @HostListener('window:message', ['$event'])
    onWindowMessage(messageEvent: MessageEvent) {
        console.log('Window received message', messageEvent.data);

        if (messageEvent && messageEvent.data &&
            messageEvent.data.channel === this.commChannel &&
            messageEvent.data.tag === this.windowId) {

            switch (messageEvent.data.type) {
                case 'ready':
                    this.handleMessageReady(messageEvent.data);
                    break;

                case 'formError':
                    this.handleMessageFormError(messageEvent.data);
                    break;

                case 'formSubmit':
                    this.handleMessageFormSubmit(messageEvent.data);
                    break;

                default:
                    console.log('Main Window: Unknown message received', messageEvent.data);
            }
        }
    }

    /**
     * Fetch form data and pass it to
     * @param data
     */
    protected handleMessageReady(data: any) {
        this.formioController.requestFormioForm().subscribe((formData) => {
            // Set additional form settings
            formData.language = this.translate.currentLang;

            console.log('Received form schema', formData);

            this.sendMessage('formData', formData);
            this.isFormioFormReady = true;
        }, (error: DsError) => { // error
            console.warn('Error while FormioModalFrameComponent::handleMessageReady', error);
            this.showError(error);
        });
    }

    /**
     * Called when the Formio form fails to submit due to validation errors
     * @param data `payload` contains an array of form errors.
     */
    protected handleMessageFormError(data: any) {
        this.formioController.handleFormioFormEvent('error', data.payload);
    }

    /**
     * Called when the Formio form is submitted in the IFrame
     * @param data `payload` contains the form's submission value (object)
     */
    protected handleMessageFormSubmit(data: any) {
        this.formioController.submitFormioForm(data.payload).subscribe((submissionResult) => {
            console.log('Received form result', submissionResult);
            this.formioController.handleFormioFormEvent('submissionResult', submissionResult);
        }, (error: DsError) => { // error
            console.warn('Error while FormioModalFrameComponent::handleMessageFormSubmit', error);
            this.showError(error);
        });
    }

    protected sendMessage(type: string, payload: any) {
        if (this.iframe && this.iframe.nativeElement && this.iframe.nativeElement.contentWindow) {
            this.iframe.nativeElement.contentWindow.postMessage({
                channel: this.commChannel,
                tag: this.windowId,
                type: type,
                payload: payload
            }, '*');
        }
        else {
            console.warn('Target IFrame window is not available');
        }
    }

    protected showError(error: DsError) {
        let title = this.translate.instant(error.title);
        let message = this.translate.instant(error.message);
        // this.modalContent = `
        // <div class="alert alert-danger" role="alert">
        //   <h4 class="alert-heading">${title}</h4>
        //   <p>${message}</p>
        // </div>`;

        this.toastr.error(message, title, {
            'dismiss': 'click'
        });
    }
}
