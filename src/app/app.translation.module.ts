import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import {TranslateModule, TranslateLoader, LangChangeEvent} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import {Subject} from 'rxjs';

// export function createTranslateLoader(http: Http) {
//     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
//
// const translationOptions = {
//   loader: {
//     provide: TranslateLoader,
//     useFactory: createTranslateLoader,
//     deps: [Http]
//   }
// };

@NgModule({
  // imports: [TranslateModule.forRoot(translationOptions)],
  imports: [TranslateModule],
  exports: [TranslateModule],
  providers: [TranslateService]
})
export class AppTranslationModule {
  constructor(translate: TranslateService) {
    const defaultLang = 'en';
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang(defaultLang);
    translate.use(defaultLang);
  }
}
