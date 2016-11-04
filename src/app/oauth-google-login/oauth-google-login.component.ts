import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { AuthService } from '../services/auth.service';
import { OauthModalComponent } from '../oauth-modal/oauth-modal.component';
declare var gapi: any;

@Component({
  selector: 'app-oauth-google-login',
  templateUrl: './oauth-google-login.component.html',
  styleUrls: ['./oauth-google-login.component.css']
})
export class OauthGoogleLoginComponent implements OnInit {
  @Input() oauthModal: OauthModalComponent;

  constructor(private authService: AuthService) {
    gapi.load('client:auth2', this.initGapi);
  }

  initGapi() {
    gapi.client.setApiKey('HvDIoVVCRFo9s3SB3ZiDB2Jy');
    gapi.auth2.init({
      client_id: '850347064756-5rfgqlolhpdclif1vg0nhbsh9asdg6sd.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.email'
    });
  }

  ngOnInit() {
  }

  onClick() {
    gapi.auth2.getAuthInstance().signIn().then( ()=> {
      this.login(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
    });
  }

  login(token) {
    this.authService.oauthLogin(token, 'google', null).subscribe(
      (response) => {},
      (error) => {
        if (error.json().errorsFields.hasOwnProperty('email')) {
          this.oauthModal.emailModal.show();
        } else {
          this.oauthModal.token = token;
          this.oauthModal.provider = 'google';
          this.oauthModal.showModal();
        }
      }
    );
  }

}
