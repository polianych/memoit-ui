import { Injectable, Injector, OpaqueToken } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';
import { Oauth2PopupService } from './oauth2-popup.service';
import { Oauth2ProviderService } from './oauth2-provider.service';
import { extend } from '../../utils/extend';
import defaultConfig from './oauth2-provider-configs';
import { Oauth2ServiceOptions } from './oauth2-service-options.interface';


@Injectable()
export class Oauth2Service {

  constructor(protected injector: Injector) {
  }

  authenticate(providerToken: OpaqueToken): Promise<any> {
    let provider: Oauth2ProviderService = this.injector.get(providerToken) as Oauth2ProviderService;
    return provider.authenticate();
  }

  static provider(diToken: OpaqueToken, options: Oauth2ServiceOptions) {
    if (defaultConfig[diToken.toString()]) {
      options = extend(defaultConfig[diToken.toString()], options);
    }
    return {
      provide: diToken,
      useFactory: (popupService: Oauth2PopupService, localStorage: LocalStorageService) => new Oauth2ProviderService(options, popupService, localStorage),
      deps: [Oauth2PopupService, LocalStorageService]
    }
  }
}
