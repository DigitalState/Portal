import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../../global.state';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user';

@Component({
  selector: 'ds-profile',
  templateUrl: '../templates/profile.template.html',
  // template: `<router-outlet></router-outlet>`
})
export class DsProfileComponent {

  user: User;

  constructor(protected globalState: GlobalState,
              protected translate: TranslateService,
              protected auth: AuthService) {

    this.user = this.auth.getAuthUser();
  }

  ngOnInit() {
    setTimeout(() => {
      this.globalState.notifyDataChanged('menu.activeLink', {
        'title': 'general.menu.profile'
      });
    });
  }
}
