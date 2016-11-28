import { Component, Input, OpaqueToken } from "@angular/core";
import { GOOGLE } from "../oauth2/oauth2-providers";
import { Oauth2Service } from "../oauth2/oauth2.service";
import { SocialButtonComponent } from "./social-button.component";

@Component({
  selector: 'auth-google-button',
  templateUrl: './social-button.component.html'
})
export class GoogleButtonComponent extends SocialButtonComponent{
  title: string = 'Google';
  klass: string = 'google plus';
  token: OpaqueToken = GOOGLE;
  constructor(protected oauth2: Oauth2Service) {
    super(oauth2)
  }
}
