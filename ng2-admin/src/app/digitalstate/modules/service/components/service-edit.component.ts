import {AfterViewInit, ChangeDetectorRef, Component, NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';
import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import 'rxjs/Rx';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'ds-service-edit',
    templateUrl: '../templates/form.template.html'
})
export class DsServiceEditComponent extends DsBaseEntityFormComponent implements AfterViewInit {

    entityUrlPrefix = 'services';
    headerTitle = 'Edit Service';
    isNew = false;

    constructor(route: ActivatedRoute,
                router: Router,
                location: Location,
                zone: NgZone,
                changeDetectorRef: ChangeDetectorRef,
                translate: TranslateService,
                toastr: ToastsManager,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(route, router, location, microserviceConfig, toastr);

        this.entityApiService = entityApiService;
        this.translate = translate;
        console.log('zone', zone);

        // // subscribe to language-change events
        // this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        //     console.log('DsServiceEditComponent :: onLangChange :: ', event);
        //     zone.run(() => {
        //         console.log('enabled time travel');
        //     });
        //     // this.translate.reloadLang(event.lang).subscribe(() => {
        //     //     this.updateTranslations();
        //     // });
        //     // translate.use(event.lang);
        //     return;
        // });
    }

    ngOnInit() {
        super.ngOnInit();

        // this.languageChangeSubscriber = window.translationChange.subscribe((event: LangChangeEvent) => {
        //     console.log('DsServiceEditComponent :: translationChange :: ', this.entityUrlPrefix);
        //     this.translate.reloadLang(event.lang);
        //     // this.changeDetectorRef.markForCheck();
        // });
    }

    ngOnDestroy() {
        console.log('DsServiceEditComponent UNSUBSCRIBING from language change');
        // this.languageChangeSubscriber.unsubscribe();
    }

    ngAfterViewInit() {
        console.log('DsServiceEditComponent :: ngOnInit :: current lang: ', this.translate.currentLang);


        // this.languageChangeSubscriber = window.translationChange.subscribe((event: LangChangeEvent) => {
        //     console.log('DsBaseEntityFormComponent :: translationChange :: ', this.entityUrlPrefix);
        //     // this.translate.reloadLang(event.lang);
        // });
    }
}
