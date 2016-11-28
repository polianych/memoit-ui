import { Component, OpaqueToken } from "@angular/core";
import { FACEBOOK } from "../oauth2/oauth2-providers";
import { SocialButtonComponent } from "./social-button.component";
import { Oauth2Service } from "../oauth2/oauth2.service";

@Component({
  selector: 'auth-facebook-button',
  templateUrl: './social-button.component.html'
})
export class FacebookButtonComponent extends SocialButtonComponent {
  title: string = 'Facebook';
  klass: string = 'facebook';
  token: OpaqueToken = FACEBOOK;
  constructor(protected oauth2: Oauth2Service) {
    super(oauth2)
  }
}
