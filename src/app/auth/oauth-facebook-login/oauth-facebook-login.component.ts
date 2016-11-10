import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import {
  FacebookService,
  FacebookLoginResponse,
  FacebookLoginOptions,
  FacebookInitParams
} from 'ng2-facebook-sdk/dist';

import { OauthModalComponent } from '../oauth-modal/oauth-modal.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-oauth-facebook-login',
  templateUrl: './oauth-facebook-login.component.html',
  styleUrls: ['./oauth-facebook-login.component.css'],
  providers: [FacebookService]
})
export class OauthFacebookLoginComponent implements OnInit {
  @Input() oauthModal: OauthModalComponent;

  constructor(private fb: FacebookService, private authService: AuthService) {
    let fbParams: FacebookInitParams = {
      appId: '292051701193745',
      xfbml: true,
      version: 'v2.6'
    };
    this.fb.init(fbParams);
  }

  ngOnInit() {
  }

  onClick(): void {
    let options: FacebookLoginOptions = {
      scope: 'public_profile,email'
    }
    this.fb.login(options).then(
      (response: FacebookLoginResponse) => this.login(response),
      (error: any) => console.log(error)
    );
  }

  login(response: FacebookLoginResponse) {
    let token = response.authResponse.accessToken;
    this.authService.oauthLogin(token, 'facebook', null).subscribe(
      (response) => {},
      (error) => {
        if (error.json().errors_fields.hasOwnProperty('email')) {
          this.oauthModal.emailModal.show();
        } else {
          this.oauthModal.token = token;
          this.oauthModal.provider = 'facebook';
          this.oauthModal.showModal();
        }
      }
    );
  }



}
