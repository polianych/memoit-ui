import { NgModule, ModuleWithProviders, OpaqueToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Oauth2CallbackComponent } from './oauth2-callback.component';
import { Oauth2Service } from './oauth2.service';
import { Oauth2PopupService } from './oauth2-popup.service';
import { Oauth2ServiceOptions } from './oauth2-service-options.interface';


interface IOauth2ModuleSettings {
  diToken: OpaqueToken,
  options: Oauth2ServiceOptions
}

@NgModule({
  declarations: [
    Oauth2CallbackComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'oauth2/callback',
        component: Oauth2CallbackComponent,
      }
    ]),
  ],
  providers: []
})
export class Oauth2Module {
  static forRoot(oauthProviders: IOauth2ModuleSettings[]): ModuleWithProviders {
    let providers: any[] = [Oauth2Service, Oauth2PopupService];
    for (let i in oauthProviders) {
      let settings: IOauth2ModuleSettings = oauthProviders[i];
      providers.push(Oauth2Service.provider(settings.diToken, settings.options));
    }
    return {
      ngModule: Oauth2Module,
      providers: providers
    }
  }
}
