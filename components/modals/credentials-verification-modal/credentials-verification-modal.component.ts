import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from 'ng2-toastr';

import { AuthService } from '../../../modules/auth/auth.service';

import merge from 'lodash/merge';

@Component({
    selector: 'credentials-verification-modal',
    styleUrls: [('./credentials-verification-modal.component.scss')],
    templateUrl: './credentials-verification-modal.component.html'
})

export class CredentialsVerificationModalComponent implements OnInit {

    username: string;
    password: string;
    authEndpoint: string;

    actions = [
        { command: 'confirm', label: 'ds.microservices.entity.action.confirm' },
        // { command: 'no', label: 'No' },
    ];

    constructor(protected activeModal: NgbActiveModal,
                protected toastr: ToastsManager,
                protected translate: TranslateService,
                protected auth: AuthService) {
    }

    ngOnInit() {}

    /**
     *
     * @param action
     */
    verifyCredentials() {
        this.auth.loginVerify(this.authEndpoint, this.username, this.password)
            .finally(() => {

            })
            .subscribe(
                successJson => {
                    if (successJson) {
                        this.closeModal({
                            'status': 'success',
                            'username': this.username,
                            'password': this.password,
                        });
                    }
                    else {
                        this.closeModal({ 'status': 'error' });
                    }
                },
                errorJson => {
                    // console.error('Login error response', errorJson)
                    this.toastr.error(this.translate.instant('ds.messages.credentialsVerificationFailed') + ' ' + errorJson.message);
                    // this.closeModal({ 'status': 'cancelled' });
                }
            );
    }

    closeModal(result: any) {
        this.activeModal.close(result);
    }
}
