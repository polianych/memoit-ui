import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;
  errors = {};
  errorMsgs = [];
  isLoading: boolean = false;


  constructor(public authService: AuthService, public fb: FormBuilder, public router: Router, public route: ActivatedRoute) {
    this.form = fb.group({
      email:  ['', Validators.required],
      password:  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    this.isLoading = true;
    this.clearErrors();
    this.authService.signIn(form.value)
        .subscribe(
          (values) => {
            this.isLoading = false;
          },
          (msg) => {
            console.log('Signin erro:', msg);
            this.error = true;
            this.isLoading = false;
            if (msg.json().hasOwnProperty('errors')){
              this.errorMsgs = msg.json().errors_full;
              this.errors = msg.json().errors;
            }
        });
  }

  clearErrors() {
    this.error = false;
    this.errorMsgs = [];
    this.errors = {};
  }

}
