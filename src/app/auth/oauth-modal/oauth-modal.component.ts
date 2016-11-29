import { Component, OpaqueToken, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService, OauthError } from '../services/auth.service';

@Component({
  selector: 'app-oauth-modal',
  templateUrl: './oauth-modal.component.html',
  styleUrls: ['./oauth-modal.component.css']
})

export class OauthModalComponent implements OnInit, OnDestroy {
  @ViewChild("myModal") myModal;
  @ViewChild("emailModal") emailModal;
  private errorSubscription: Subscription;
  private provider: OpaqueToken;
  private access_token: string;
  public form: FormGroup;
  public error: boolean = false;
  public errors = [];
  public errorsFields = {};
  public isLoading: boolean = false;

  constructor(public authService: AuthService, public fb: FormBuilder, public router: Router) {
    this.form = fb.group({
      nickname:  ['', Validators.required]
    });
    this.errorSubscription = this.authService.oauthError.subscribe( (value)=> this.onOauthError(value) );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  showModal() {
    this.myModal.show();
  }
  onOauthError(value: OauthError){
    this.provider = value.provider,
    this.access_token = value.access_token;
    this.showModal();
  }

  onSubmit(form: FormGroup) {
    this.isLoading = true;
    this.clearErrors();
    this.authService.oauthSignup(this.provider,  this.access_token, form.value)
      .subscribe(
        (response) => {
          this.myModal.hide()
        },
        (msg) => {
          this.error = true;
          this.isLoading = false;
          if (msg.json().hasOwnProperty('errors')){
            this.errors = msg.json().errors;
            this.errorsFields = msg.json().errors_fields;
          }
        }
    );
  }

  onEmailOk() {
    this.emailModal.hide();
  }


  clearErrors() {
      this.error = false;
      this.errorsFields = {};
      this.errors = [];
  }

}
