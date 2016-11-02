import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { AuthService } from '../services/auth.service';
import { OauthModalComponent } from '../oauth-modal/oauth-modal.component';
import {URLSearchParams, QueryEncoder} from '@angular/http';
declare var location: any;
@Component({
  selector: 'app-oauth-vk-login',
  templateUrl: './oauth-vk-login.component.html',
  styleUrls: ['./oauth-vk-login.component.css']
})
export class OauthVkLoginComponent implements OnInit {
  subscription = null;
  @Input() oauthModal: OauthModalComponent;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.routeConfig.path == 'signin/vk'){
        let params = new URLSearchParams(location.hash.substr(1), new QueryEncoder());
        if(params.get('access_token')){
          this.login(params.get('access_token'));
        }
    }
  }

  onClick() {
    location.href = 'https://oauth.vk.com/authorize?redirect_uri=http://memoit.local/signin/vk&display=page&client_id=5693818&scope=email&response_type=token';
  }

  login(token) {
    this.authService.oauthLogin(token, 'vk', null).subscribe(
      (response) => {},
      (error) => {
        console.log(error.json().errors.hasOwnProperty('email'));
        if (error.json().errors.hasOwnProperty('email')) {
          this.oauthModal.emailModal.show();
        } else {
          this.oauthModal.token = token;
          this.oauthModal.provider = 'vk';
          this.oauthModal.showModal();
        }
      });
  }

}
