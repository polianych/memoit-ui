import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {
  Http,
  Response,
  Headers,
  Request,
  RequestMethod,
  RequestOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';

import { User, UserToken } from './user';

@Injectable()
export class AuthService implements CanActivate {
  public currentUserToken: UserToken;
  public currentUser: User;

  constructor(public router: Router, private _http: Http) {
    console.log('authService constructor');
  }

  init() {
    this._getUserTokenFromStorage()
    if (this.currentUserToken != null)
      this.validateToken()
      return;
  }

  userSignedIn(): boolean {
    return !!this.currentUser;
  }

  canActivate() {
    if (this.userSignedIn())
      return true;
    else {
      localStorage.setItem('redirectToAfterAuthentication', window.location.pathname + window.location.search);
      this.router.navigate(['/auth/signin']);
      return false;
    }
  }

  signUp(values: Object): Observable<Response> {
    let body = JSON.stringify({ user: values });
    let response = this.post('/api/users', body);
    return response;
  }

  signIn(values: Object): Observable<Response> {
    let body = JSON.stringify({ user: values });
    let response = this.post('/api/sign_in', body);
    return response;
  }

  signOut(): Observable<Response> {
    let response = this.delete('/api/sign_out');
    response.subscribe( res => {
      this.currentUserToken = null;
      this.currentUser = null;
      localStorage.removeItem('token');
      localStorage.removeItem('client');
    }, error =>  console.log('Error sign out', error))
    return response;
  }

  validateToken(): Observable<Response> {
    let response = this.get('/api/users/me');
    return response;
  }

  oauthLogin(token: string, provider: string, nickname: any): Observable<Response> {
    let body = JSON.stringify({ access_token: token, provider: provider, nickname: nickname});
    let response = this.post('/api/oauth', body);
    return response;
  }

  resetPassword(values): Observable<Response> {
    values.password_reset_url = 'http://memoit.local/auth/password-resets/%{id}?password_reset_token=%{password_reset_token}';
    let body = JSON.stringify(values);
    let response = this.post('/api/password_resets', body);
    return response;
  }

  updatePassword(values, id, password_reset_token): Observable<Response> {
    let body = JSON.stringify({ user: values, password_reset_token: password_reset_token });
    let response = this.put('/api/password_resets/' + id, body);
    return response;
  }

  // Standard HTTP requests
  get(path: string): Observable<Response> {
    return this.sendHttpRequest(new RequestOptions({
        method: RequestMethod.Get,
        url:    path
    }));
  }

  post(path: string, data: any): Observable<Response> {
    return this.sendHttpRequest(new RequestOptions({
        method: RequestMethod.Post,
        url:    path,
        body:   data
    }));
  }

  put(path: string, data: any): Observable<Response> {
    return this.sendHttpRequest(new RequestOptions({
        method: RequestMethod.Put,
        url:    path,
        body:   data
    }));
  }

  delete(path: string): Observable<Response> {
    return this.sendHttpRequest(new RequestOptions({
        method: RequestMethod.Delete,
        url:    path
    }));
  }

  sendHttpRequest(requestOptions: RequestOptions): Observable<Response> {
    let baseRequestOptions: RequestOptions;
    let baseHeaders: Object = {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
    };
    if (this.currentUserToken != null) {
        Object.assign(baseHeaders, {
          'Authorization':  this.currentUserToken.token,
          'Client': this.currentUserToken.client
        });
    }

    baseRequestOptions = new RequestOptions({
        headers: new Headers(baseHeaders)
    });
    baseRequestOptions = baseRequestOptions.merge(requestOptions);
    let response = this._http.request(new Request(baseRequestOptions)).share();
    this._handleResponse(response);

    return response;
  }

  private _handleResponse(response: Observable<Response>) {
      response.subscribe(res => {
        console.log('succ in handle');
          this._parseAuthHeadersFromResponse(<any>res);
          if (res.json().hasOwnProperty('user')) {
            this.currentUser = res.json().user;
            if (localStorage.getItem('redirectToAfterAuthentication')) {
              console.log(localStorage.getItem('redirectToAfterAuthentication'))
              this.router.navigate([localStorage.getItem('redirectToAfterAuthentication')]);
              localStorage.removeItem('redirectToAfterAuthentication');
            } else {
              this.router.navigate(['/settings']);
            }
        }

      }, error => {
          this._parseAuthHeadersFromResponse(<any>error);
          console.log('Auth Service Error: ', error);
      });
  }

  private _parseAuthHeadersFromResponse(data: any){
    let headers = data.headers;

    let userToken: UserToken = {
        token:  headers.get('Authorization'),
        client: headers.get('Client')
    };

    this._setUserToken(userToken);
  }

  private _setUserToken(userToken: UserToken) {
    if (this._checkIfComplete(userToken) ) {
        this.currentUserToken = userToken;
        localStorage.setItem('token', userToken.token);
        localStorage.setItem('client', userToken.client);
    }
  }


  private _getUserTokenFromStorage() {
    let userToken: UserToken = {
        token: localStorage.getItem('token'),
        client: localStorage.getItem('client')
    };
    if (this._checkIfComplete(userToken))
      this.currentUserToken = userToken;
  }

  private _checkIfComplete(userToken: UserToken): boolean {
    return (userToken.token  != null &&
            userToken.client != null);
  }

}
