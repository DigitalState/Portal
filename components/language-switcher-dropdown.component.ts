import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'ds-language-switcher-dropdown',
    template: `
		<div #dropdown *ngIf="languages" class="dropdown al-dropdown">
			<a class="toggle-link btn btn-default dropdown-toggle" id="language-switcher-dropdown" href="#" data-toggle="dropdown" aria-expanded="false" tabindex="0" role="button">
				<span class="language-name">{{ 'languages.' + currentLanguage.key | translate }}</span>
			</a>
			<!--<div class="dropdown-menu" aria-labelledby="language-switcher-dropdown">-->
                <!--<a *ngFor="let language of getListedLanguages()" class="dropdown-item"-->
                   <!--href="javascript:;"-->
                   <!--(mousedown)="onLanguageMouseDown(language.key)">-->
                    <!--{{ 'languages.' + language.key | translate }}-->
                <!--</a>-->
			<!--</div>-->
			<ul class="dropdown-menu language-dropdown" aria-labelledby="language-switcher-dropdown">
				<li *ngFor="let language of getListedLanguages()" class="dropdown-item">
					<a href="javascript:;" 
                       (mousedown)="onLanguageMouseDown(language.key)">
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
export class DsLanguageSwitcherDropdownComponent {
    @ViewChild('dropdown') dropdownEl: ElementRef;
    @Output() onLanguageChange: EventEmitter<string>;

    currentLanguage: any;
    languages: object[];
    checked: true;

    constructor(protected translate: TranslateService) {
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

    /**
     * Workaround for Safari's issue: Clicking on a language menu item from the dropdown is not detected by Safari.
     * The idea is to use mousedown event instead of click and then close the dropdown manually.
     * @param lang
     */
    onLanguageMouseDown(lang: string) {
        this.loadCurrentLanguageTranslation(lang);
        this.onLanguageChange.emit(lang);
        jQuery(this.dropdownEl.nativeElement).find('.dropdown-toggle').trigger('click');
    }

    onLanguageClick(lang: string) {
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
