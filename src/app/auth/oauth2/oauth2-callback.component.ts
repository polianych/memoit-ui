import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';

@Component({
  selector: 'oauth-callback-handler',
  template: ''
})
export class Oauth2CallbackComponent {
  constructor(private router: Router, public localStorage: LocalStorageService) {
    let url = router.parseUrl(this.router.url);
    let params;

    if (url.queryParams.hasOwnProperty('error')){
      params = url.queryParams;
    }
    else if (url.fragment) {
      params = router.parseUrl('/?'+url.fragment).queryParams;
    } else {
      params = url.queryParams;
    }
    console.log('Localstorage callbacks value', params.state, params)
    this.localStorage.store(params.state, params);
  };
}
