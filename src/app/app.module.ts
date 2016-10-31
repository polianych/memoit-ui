import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { OauthFacebookLoginComponent } from './oauth-facebook-login/oauth-facebook-login.component';
import { OauthModalComponent } from './oauth-modal/oauth-modal.component';
import { OauthGoogleLoginComponent } from './oauth-google-login/oauth-google-login.component';
import { OauthVkLoginComponent } from './oauth-vk-login/oauth-vk-login.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    UserSettingsComponent,
    OauthFacebookLoginComponent,
    OauthModalComponent,
    OauthGoogleLoginComponent,
    OauthVkLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgSemanticModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/signin', pathMatch: 'full' },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'settings', component: UserSettingsComponent, canActivate: [AuthService] }
    ])
  ],
  providers: [
    AuthService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
