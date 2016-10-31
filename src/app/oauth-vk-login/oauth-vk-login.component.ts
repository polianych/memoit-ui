import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { AuthService } from '../services/auth.service';
import { OauthModalComponent } from '../oauth-modal/oauth-modal.component';
// declare var VK: any;
@Component({
  selector: 'app-oauth-vk-login',
  templateUrl: './oauth-vk-login.component.html',
  styleUrls: ['./oauth-vk-login.component.css']
})
export class OauthVkLoginComponent implements OnInit {
  @Input() oauthModal: OauthModalComponent;

  constructor(private authService: AuthService) {
    // VK.init({
    //   apiId: 5693818
    // });
  }

  ngOnInit() {
  }

  onClick() {
    // VK.Auth.login( (resp)=>{
    //   console.log(resp);
    // });
  }

}
