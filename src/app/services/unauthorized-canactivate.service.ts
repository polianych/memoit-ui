import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class UnauthorizedCanActivateService implements CanActivate {

  constructor(public authService: AuthService) {
  }

  canActivate() {
    return !this.authService.userSignedIn();
  }

}
