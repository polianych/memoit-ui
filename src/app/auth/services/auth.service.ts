import { Injectable,
         OpaqueToken,
         Output,
         EventEmitter } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {
  Http,
  Response,
  Headers,
  Request,
  RequestMethod,
  RequestOptions,
  URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';

import { User, UserToken } from './user';

export interface OauthError {
  provider: OpaqueToken,
  access_token: string,
  errors: Object
}
@Injectable()
export class AuthService implements CanActivate {
  public oauthError: Observable<OauthError>;
  private _oauthError: Subject<OauthError> = new Subject();
  public currentUserToken: UserToken;
  public currentUser: User;

  constructor(public router: Router, private _http: Http) {
    console.log('authService constructor');
    this.oauthError = this._oauthError.asObservable();
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
    this._handleResponse(response);
    return response;
  }

  signIn(values: Object): Observable<Response> {
    let body = JSON.stringify({ user: values });
    let response = this.post('/api/sign_in', body);
    this._handleResponse(response);
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
    this._handleResponse(response);
    return response;
  }

  oauthSignIn(provider: OpaqueToken, access_token: string): Observable<Response> {
    let body = JSON.stringify({ provider: this.getProviderFromOpaqueToken(provider), access_token: access_token});
    let response = this.post('/api/oauth/sign_in', body);
    response.subscribe( (value)=> {
      console.log('Success oauth', this.getProviderFromOpaqueToken(provider))
    }, (error) => {
      this._oauthError.next({
        provider: provider,
        access_token: access_token,
        errors: error.json()
      })
    })
    this._handleResponse(response);
    return response;
  }

  oauthSignup(provider: OpaqueToken, access_token: string, user: Object): Observable<Response> {
    let body = JSON.stringify({ provider: this.getProviderFromOpaqueToken(provider), access_token: access_token, user: user});
    let response = this.post('/api/oauth/sign_up', body);
    this._handleResponse(response);
    return response;
  }

  getProviderFromOpaqueToken(provider: OpaqueToken): string {
    return provider.toString().replace('Token oauth2.','')
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
  get(path: string, query?: Object): Observable<Response> {
    let search = new URLSearchParams();
    for (let i in query) {
      search.set(i, query[i])
    }
    return this.sendHttpRequest(new RequestOptions({
        search: search,
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

    return response;
  }

  private _handleResponse(response: Observable<Response>) {
      response.subscribe(res => {
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
