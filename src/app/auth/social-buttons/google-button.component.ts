import { Component, Input, OpaqueToken } from '@angular/core';
import { GOOGLE } from '../oauth2/oauth2-providers';
import { Oauth2Service } from '../oauth2/oauth2.service';
import { SocialButtonComponent } from './social-button.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'auth-google-button',
  templateUrl: './social-button.component.html'
})
export class GoogleButtonComponent extends SocialButtonComponent{
  title: string = '';
  klass: string = 'google plus';
  icon: string = 'google plus';
  token: OpaqueToken = GOOGLE;
  constructor(protected oauth2: Oauth2Service, protected authService: AuthService) {
    super(oauth2, authService)
  }
}
