import { NgModule, ModuleWithProviders } from "@angular/core";

import { AuthService } from './services/auth.service';
import { UnauthorizedCanActivateService } from './services/unauthorized-canactivate.service';

@NgModule({
})

export class AuthServicesModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: AuthServicesModule,
      providers: [
        AuthService,
        UnauthorizedCanActivateService
      ]
    }
  }
}
