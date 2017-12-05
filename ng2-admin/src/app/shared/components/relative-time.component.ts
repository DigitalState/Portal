import { Component, Input } from '@angular/core';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AppState } from '../../app.service';

import moment from 'moment';
import { Subscriber } from "rxjs/Subscriber";


@Component({
    selector: 'relative-time',
    'template': `
		<span title="{{tooltip}}" data-toggle="tooltip" data-placement="top" class="cursor-pointer">
        {{timeOutput}}
	    </span>`
})
export class DsRelativeTimeComponent {

    /** Date/Time in ISO-UTC string format **/
    @Input() timeInput: string;

    timeOutput: string;
    tooltip: string;
    config: any;

    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    constructor(protected appState: AppState,
                protected translate: TranslateService) {

        this.config = this.appState.get('config');
    }

    ngOnInit() {
        this.update();

        // Subscribe to language-change events
        this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.update();
        });
    }

    ngOnDestroy() {
        // Unsubscribe from language-change events
        if (this.languageChangeSubscriber) {
            this.languageChangeSubscriber.unsubscribe();
        }
    }

    update() {
        let momentTime = moment(this.timeInput).locale(this.translate.currentLang).local();
        this.timeOutput = momentTime.fromNow();
        this.tooltip = momentTime.format(this.config.date.format.long);
    }

}