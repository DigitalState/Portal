import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DsLanguageSwitcherComponent } from './language-switcher.component';

@Component({
    selector: 'ds-language-switcher-tabs',
    template: `
        <ul #tabsList class="switcher-tabs language-tabs">
            <li *ngFor="let language of getListedLanguages()" 
                [ngClass]="{'active': currentLanguage.key === language.key}" 
                class="switcher-tab-item lang-{{language.key}}">
                <span class="link-container">
                    <span class="lang-checkbox">
                        <md-checkbox></md-checkbox>
                    </span>
                    <a href="javascript:;" (click)="switchLang(language.key)">
                        <!--<i class="fa fa-flag"></i>-->
                        {{ 'languages.' + language.key | translate }}
                    </a>
                </span>
            </li>
        </ul>
    `,
    host: {
        class: 'ds-language-switcher-tabs'
    }
})
export class DsLanguageSwitcherTabsComponent extends DsLanguageSwitcherComponent {

    @ViewChild('tabsList') tabsListElement: ElementRef;

    @Output() onLanguageChange: EventEmitter<string>;

    currentLanguage: object;
    languages: object[];
    checked: true;

    constructor(protected translate: TranslateService) {
        super(translate);
        this.onLanguageChange = new EventEmitter();
    }

    ngOnInit() {
        this.languages = this.translate.getLangs().map((langKey) =>
            ({
                key: langKey,
                name: this.translate.instant('languages.' + langKey)
            })
        );

        this.loadCurrentLanguageTranslation();
    }

    switchLang(lang: string) {
        this.onLanguageChange.emit(lang);
        // this.translate.use(lang).subscribe((translationDocument) => {
        //     localStorage.setItem('lang', lang);
        //     this.loadCurrentLanguageTranslation();
        //     return Observable.of({ lang: lang, translations: translationDocument });
        // });
        let $tabs = $(this.tabsListElement.nativeElement);
        $tabs.find('.switcher-tab-item').removeClass('active');
        $tabs.find('.switcher-tab-item.lang-' + lang).addClass('active');
    }

    getListedLanguages() {
        // return this.languages.filter((language) => (language['key'] !== this.translate.currentLang));
        return this.languages;
    }

    protected loadCurrentLanguageTranslation() {
        this.currentLanguage = {
            key: this.translate.currentLang,
            name: this.translate.instant('languages.' + this.translate.currentLang)
        };
    }
}
