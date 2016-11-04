import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';
import { AuthService } from './services/auth.service';
import { UnauthorizedCanActivateService } from './services/unauthorized-canactivate.service';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { OauthFacebookLoginComponent } from './oauth-facebook-login/oauth-facebook-login.component';
import { OauthModalComponent } from './oauth-modal/oauth-modal.component';
import { OauthGoogleLoginComponent } from './oauth-google-login/oauth-google-login.component';
import { OauthVkLoginComponent } from './oauth-vk-login/oauth-vk-login.component';
import { PasswordResetsNewComponent } from './password-resets-new/password-resets-new.component';
import { PasswordResetsEditComponent } from './password-resets-edit/password-resets-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    UserSettingsComponent,
    OauthFacebookLoginComponent,
    OauthModalComponent,
    OauthGoogleLoginComponent,
    OauthVkLoginComponent,
    PasswordResetsNewComponent,
    PasswordResetsEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgSemanticModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/signin', pathMatch: 'full' },
      { path: 'signup', component: SignUpComponent, canActivate: [UnauthorizedCanActivateService] },
      { path: 'signin', component: SignInComponent, canActivate: [UnauthorizedCanActivateService] },
      { path: 'signin/vk', component: SignInComponent, canActivate: [UnauthorizedCanActivateService] },
      { path: 'signin/password-resets', component: PasswordResetsNewComponent, canActivate: [UnauthorizedCanActivateService] },
      { path: 'signin/password-resets/:id', component: PasswordResetsEditComponent, canActivate: [UnauthorizedCanActivateService] },
      { path: 'settings', component: UserSettingsComponent, canActivate: [AuthService] }
    ])
  ],
  providers: [
    AuthService,
    UnauthorizedCanActivateService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
