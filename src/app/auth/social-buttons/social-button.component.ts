import { Input, Component, OpaqueToken } from "@angular/core";
import { Oauth2Service } from "../oauth2/oauth2.service";

export abstract class SocialButtonComponent {
  @Input("class") class: string;
  abstract title: string;
  abstract klass: string;
  abstract token: OpaqueToken;

  constructor(protected oauth2: Oauth2Service) {
  }

  authenticate(){
    this.oauth2.authenticate(this.token)
      .then((value) => console.log(this.token, value), (value)=> console.log(this.token, 'error', value))
  };
}
