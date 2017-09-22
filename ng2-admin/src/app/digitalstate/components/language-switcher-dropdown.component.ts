import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DsLanguageSwitcherComponent } from './language-switcher.component';

@Component({
    selector: 'ds-language-switcher-dropdown',
    template: `
		<div *ngIf="languages" class="dropdown al-dropdown">
			<a class="toggle-link btn btn-default dropdown-toggle" id="language-switcher-dropdown" data-toggle="dropdown" aria-expanded="false" tabindex="0">
				<span class="language-name">{{ 'languages.' + currentLanguage.key | translate }}</span>
			</a>
			<ul class="dropdown-menu language-dropdown" aria-labelledby="language-switcher-dropdown">
				<li *ngFor="let language of getListedLanguages()" class="dropdown-item">
					<a href="javascript:;" (click)="switchLang(language.key)">
						{{ 'languages.' + language.key | translate }}
					</a>
				</li>
			</ul>
		</div>
    `,
    host: {
        class: 'ds-language-switcher-dropdown'
    }
})
export class DsLanguageSwitcherDropdownComponent extends DsLanguageSwitcherComponent {

    @Output() onLanguageChange: EventEmitter<string>;

    currentLanguage: any;
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
        this.loadCurrentLanguageTranslation(lang);
        this.onLanguageChange.emit(lang);
    }

    getListedLanguages() {
        return this.languages.filter((language) => (language['key'] !== this.currentLanguage.key));
    }

    protected loadCurrentLanguageTranslation(currentLanguageKey?: string) {
        if (!currentLanguageKey) {
            currentLanguageKey = this.translate.currentLang;
        }

        this.currentLanguage = {
            key: currentLanguageKey,
            name: this.translate.instant('languages.' + currentLanguageKey)
        };
    }
}
