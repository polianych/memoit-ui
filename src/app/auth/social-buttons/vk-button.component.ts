import { Component, Input, OpaqueToken } from '@angular/core';
import { VK } from '../oauth2/oauth2-providers';
import { SocialButtonComponent } from './social-button.component';
import { Oauth2Service } from '../oauth2/oauth2.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'auth-vk-button',
  templateUrl: './social-button.component.html'
})
export class VkButtonComponent extends SocialButtonComponent  {
  title: string = '';
  klass: string = 'vk';
  icon: string = 'vk';
  token: OpaqueToken = VK;
  constructor(protected oauth2: Oauth2Service, protected authService: AuthService) {
    super(oauth2, authService)
  }
}
