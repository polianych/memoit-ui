import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PasswordResetsNewComponent } from './password-resets-new/password-resets-new.component';
import { PasswordResetsEditComponent } from './password-resets-edit/password-resets-edit.component';
import { UnauthorizedCanActivateService } from './services/unauthorized-canactivate.service';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          { path: 'signup', component: SignUpComponent, canActivate: [UnauthorizedCanActivateService] },
          { path: 'signin', component: SignInComponent, canActivate: [UnauthorizedCanActivateService] },
          { path: 'oauth/vk', component: SignInComponent, canActivate: [UnauthorizedCanActivateService] },
          { path: 'password-resets', component: PasswordResetsNewComponent, canActivate: [UnauthorizedCanActivateService] },
          { path: 'password-resets/:id', component: PasswordResetsEditComponent, canActivate: [UnauthorizedCanActivateService] }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AuthRoutingModule {
}
