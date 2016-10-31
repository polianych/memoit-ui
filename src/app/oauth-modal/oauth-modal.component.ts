import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-oauth-modal',
  templateUrl: './oauth-modal.component.html',
  styleUrls: ['./oauth-modal.component.css']
})
export class OauthModalComponent implements OnInit {
  @ViewChild("myModal") myModal;
  @ViewChild("emailModal") emailModal;
  token: string;
  provider: string;
  form: FormGroup;
  error: boolean = false;
  errors = {};
  errorMsgs = [];
  isLoading: boolean = false;

  constructor(public authService: AuthService, public fb: FormBuilder, public router: Router) {
    this.form = fb.group({
      nickname:  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  showModal() {
    this.myModal.show();
  }

  onSubmit(form: FormGroup) {
    this.isLoading = true;
    this.clearErrors();
    this.authService.oauthLogin(this.token, this.provider, form.value.nickname)
      .subscribe(
        (response) => {
          this.myModal.hide()
        },
        (msg) => {
          console.log('Oauth error: ', msg);
          this.error = true;
          this.isLoading = false;
          if (msg.json().hasOwnProperty('errors')){
            this.errorMsgs = msg.json().errors_full;
            this.errors = msg.json().errors;
          }
        }
    );
  }

  onEmailOk() {
    this.emailModal.hide();
  }

  clearErrors() {
    this.error = false;
    this.errorMsgs = [];
    this.errors = {};
  }

}
