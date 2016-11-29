import { Input, Component, OpaqueToken } from '@angular/core';
import { Oauth2Service } from '../oauth2/oauth2.service';
import { AuthService } from '../services/auth.service';

export abstract class SocialButtonComponent {
  @Input('class') class: string;
  abstract title: string;
  abstract klass: string;
  abstract icon: string;
  abstract token: OpaqueToken;

  constructor(protected oauth2: Oauth2Service, protected authService: AuthService) {
  }

  authenticate(){
    this.oauth2.authenticate(this.token)
      .then(
        (value) => {
          this.authService.oauthSignIn(this.token, value.access_token)
        },
        (value)=> console.log(this.token, 'error', value))
  };
}
