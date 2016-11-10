import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OauthFacebookLoginComponent } from './oauth-facebook-login/oauth-facebook-login.component';
import { OauthModalComponent } from './oauth-modal/oauth-modal.component';
import { OauthGoogleLoginComponent } from './oauth-google-login/oauth-google-login.component';
import { OauthVkLoginComponent } from './oauth-vk-login/oauth-vk-login.component';
import { PasswordResetsNewComponent } from './password-resets-new/password-resets-new.component';
import { PasswordResetsEditComponent } from './password-resets-edit/password-resets-edit.component';
import { AuthService } from './services/auth.service';
import { UnauthorizedCanActivateService } from './services/unauthorized-canactivate.service';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    OauthFacebookLoginComponent,
    OauthModalComponent,
    OauthGoogleLoginComponent,
    OauthVkLoginComponent,
    PasswordResetsNewComponent,
    PasswordResetsEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgSemanticModule,
    AuthRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AuthModule {
}
