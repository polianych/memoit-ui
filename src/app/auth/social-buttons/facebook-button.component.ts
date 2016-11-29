import { Component, OpaqueToken } from "@angular/core";
import { FACEBOOK } from "../oauth2/oauth2-providers";
import { SocialButtonComponent } from "./social-button.component";
import { Oauth2Service } from "../oauth2/oauth2.service";
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'auth-facebook-button',
  templateUrl: './social-button.component.html'
})
export class FacebookButtonComponent extends SocialButtonComponent {
  title: string = '';
  klass: string = 'facebook';
  icon: string = 'facebook';
  token: OpaqueToken = FACEBOOK;
  constructor(protected oauth2: Oauth2Service, protected authService: AuthService) {
    super(oauth2, authService)
  }
}
