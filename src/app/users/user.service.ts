import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/services/user';
import 'rxjs/add/operator/map';

export interface UserQuery {
  nickname: string
}
@Injectable()
export class UserService {

  constructor(public authService: AuthService) { }

  getUser(query: UserQuery): Observable<User> {
    return this.authService
      .get('/api/users/' + query.nickname).map((response) => { return response.json().user as User;})
  }

}
