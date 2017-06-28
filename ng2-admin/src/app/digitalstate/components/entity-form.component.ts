import {
    AfterViewChecked, Component, Input, ViewChild, Output, EventEmitter, ContentChildren,
    QueryList, AfterContentInit
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm, NgModel } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

import { Link } from '../models/link';

import 'rxjs/Rx';

@Component({
    selector: 'ds-entity-form',
    templateUrl: '../templates/entity-form.template.html',
})
export class DsEntityFormComponent implements AfterContentInit, AfterViewChecked {

    @Input() headerTitle: string;
    @Input() headerSubtitle: string;
    @Input() entity: any;
    @Input() backLink: Link;
    @Input() isNew: boolean;

    @Output() onFormSubmit = new EventEmitter<any>();
    @Output() onFormCancel = new EventEmitter<any>();
    @Output() onFormInit = new EventEmitter<any>();
    @Output() onFormChange = new EventEmitter<any>();
    @Output() onFormLanguageChange = new EventEmitter<any>();

    @ViewChild('entityForm') currentForm: NgForm;
    @ContentChildren(NgModel) public models: QueryList<NgModel>;

    entityForm: NgForm;
    languages: object[];
    formLanguage: any;
    submitted: boolean = false;
    protected id: number;

    /*
     Reset the form with a new hero AND restore 'pristine' class state
     by toggling 'active' flag which causes the form
     to be removed/re-added in a tick via NgIf
     TODO: Workaround until NgForm has a reset method (#6822)
     */
    private active = true;

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected location: Location,
                protected translate: TranslateService,
                protected toastr: ToastsManager) {

    }

    ngOnInit() {
        this.languages = this.translate.getLangs().map((langKey) =>
            ({
                key: langKey,
                name: this.translate.instant('ds.language-switcher.languages.' + langKey)
            })
        );

        this.loadCurrentLanguageTranslation();
    }

    ngAfterViewInit() {
        let ngContentModels = this.models.toArray();
        ngContentModels.forEach((model) => {
            this.currentForm.addControl(model);
        });

        this.onFormInit.emit(this.currentForm);
    }

    ngAfterViewChecked() {
        this.formChanged();

    }

    ngAfterContentInit() {

    }

    formChanged() {
        if (this.currentForm === this.entityForm) {
            return;
        }

        this.onFormChange.emit(this.currentForm);

        // this.entityForm = this.currentForm;
        // if (this.entityForm) {
        //     this.entityForm.valueChanges
        //         .subscribe(data => this.onValueChanged(data));
        // }
    }

    onSubmit() {
        this.onFormSubmit.emit(this.currentForm);
    }

    // onValueChanged(data?: any) {
    //     if (!this.entityForm) { return; }
    //     const form = this.entityForm.form;
    //
    //     for (const field in this.formErrors) {
    //         // clear previous error message (if any)
    //         this.formErrors[field] = '';
    //         const control = form.get(field);
    //
    //         if (control && control.dirty && !control.valid) {
    //             const messages = this.validationMessages[field];
    //             for (const key in control.errors) {
    //                 this.formErrors[field] += messages[key] + ' ';
    //             }
    //         }
    //     }
    // }

    cancelForm() {
        this.onFormCancel.emit(this.currentForm);
    }

    switchLang(newLangKey: string) {
        this.formLanguage = this.languages.find((language:any) => (language.key == newLangKey));
        this.onFormLanguageChange.emit(this.formLanguage);
    }

    getListedLanguages() {
        return this.languages.filter((language:any) => (language.key !== this.formLanguage.key));
    }

    protected loadCurrentLanguageTranslation() {
        this.formLanguage = {
            key: this.translate.currentLang,
            name: this.translate.instant('ds.language-switcher.languages.' + this.translate.currentLang)
        };
    }

}