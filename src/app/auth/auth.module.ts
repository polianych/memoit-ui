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
import { OauthModalComponent } from './oauth-modal/oauth-modal.component';
import { FacebookButtonComponent } from "./social-buttons/facebook-button.component";
import { GoogleButtonComponent } from "./social-buttons/google-button.component";
import { VkButtonComponent } from "./social-buttons/vk-button.component";
import { PasswordResetsNewComponent } from './password-resets-new/password-resets-new.component';
import { PasswordResetsEditComponent } from './password-resets-edit/password-resets-edit.component';
import { AuthService } from './services/auth.service';
import { UnauthorizedCanActivateService } from './services/unauthorized-canactivate.service';
import { AuthRoutingModule } from './auth-routing.module';
import { VK, GOOGLE, FACEBOOK } from "./oauth2/oauth2-providers";
import { Oauth2Module } from "./oauth2/oauth2.module";

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    OauthModalComponent,
    FacebookButtonComponent,
    GoogleButtonComponent,
    VkButtonComponent,
    PasswordResetsNewComponent,
    PasswordResetsEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgSemanticModule,
    AuthRoutingModule,
    Oauth2Module.forRoot([
      {
        diToken: FACEBOOK,
        options: {
          clientId: '292051701193745',
          responseType: 'token'
        }
      },
      {
        diToken: GOOGLE,
        options: {
          clientId: '850347064756-5rfgqlolhpdclif1vg0nhbsh9asdg6sd.apps.googleusercontent.com',
          responseType: 'token'
        }
      },
      {
        diToken: VK,
        options: {
          clientId: '5693818',
          responseType: 'token'
        }
      }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AuthModule {
}
