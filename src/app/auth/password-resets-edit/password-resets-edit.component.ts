import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-resets-edit',
  templateUrl: './password-resets-edit.component.html',
  styleUrls: ['./password-resets-edit.component.css']
})
export class PasswordResetsEditComponent implements OnInit {

  form: FormGroup;
  success: boolean = false;
  error: boolean = false;
  errors = [];
  errorsFields = {};
  isLoading: boolean = false;
  password_reset_token: string;
  id: string;

  constructor(public authService: AuthService, public fb: FormBuilder, public router: Router, public route: ActivatedRoute) {
    this.form = fb.group({
      password:  ['', Validators.required],
      password_confirmation:  ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
    });
     this.route.queryParams.forEach((params: Params) => {
      this.password_reset_token = params['password_reset_token'];
    });
  }



  onSubmit(form: FormGroup) {
    this.isLoading = true;
    this.clearErrors();
    this.authService.updatePassword(form.value, this.id, this.password_reset_token)
        .subscribe(
          (values) => {
            console.log('success in comp')
            this.success = true;
            this.isLoading = false;
          },
          (msg) => {
            this.success = false;
            this.error = true;
            this.isLoading = false;
            if (msg.json().hasOwnProperty('errors')) {
              this.errors = msg.json().errors;
            }
            if (msg.json().hasOwnProperty('errors_fields')) {
              this.errorsFields = msg.json().errors_fields;
            }
        });
  }

  clearErrors() {
    this.error = false;
    this.errorsFields = {};
    this.errors = [];
  }

}
