import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'ng2-webstorage';

import { Oauth2PopupService } from './oauth2-popup.service';
import { buildQueryString } from '../../utils/serialize';
import { Oauth2ServiceOptions } from './oauth2-service-options.interface';
import { extend } from '../../utils/extend';

@Injectable()
export class Oauth2ProviderService {

  private state: string;
  private localStorageSubscription: Subscription;

  constructor(public options: Oauth2ServiceOptions,
              protected popupService: Oauth2PopupService,
              private localStorage: LocalStorageService  ) {
  }

  authenticate(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.popupService.open(this.buildUrl(), this.options.popupOptions).catch((error) => {
        reject(error);
      });
      let observer: EventEmitter<any> = this.localStorage.observe(this.state);
      this.localStorageSubscription = observer.subscribe((value) => {
        if(value && value.hasOwnProperty('error')) {
          reject(new Error('Authorization was denied'));
        }
        resolve(value);
      });
    }).then(
      (value) => this.finally(value),
      (value) => { this.finally(value); throw(value) }
    );
  }

  buildUrl(): string {
    this.state = 'oauth2_state_' + Date.now().toString();
    let params = {
      client_id: this.options.clientId,
      redirect_uri: this.options.redirectUri,
      response_type: this.options.responseType || 'code',
      state: this.state
    };

    if (this.options.scope) {
      let scopeDelimiter = this.options.scopeDelimiter || ' ';
      params['scope'] = this.options.scope.join(scopeDelimiter);
    }

    params = extend(this.options.queryParams || {}, params);
    return this.options.authorizationEndpoint + '?' + buildQueryString(params);
  }

  private finally(value: any): any {
    this.popupService.closeAndCleanup();
    if (this.localStorageSubscription) {
      this.localStorageSubscription.unsubscribe();
    }
    return value;
  }
}
