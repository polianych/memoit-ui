import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-resets-new',
  templateUrl: './password-resets-new.component.html',
  styleUrls: ['./password-resets-new.component.css']
})
export class PasswordResetsNewComponent implements OnInit {
  form: FormGroup;
  success: boolean = false;
  error: boolean = false;
  errors = [];
  errorsFields = {};
  isLoading: boolean = false;

  constructor(public authService: AuthService, public fb: FormBuilder, public router: Router, public route: ActivatedRoute) {
    this.form = fb.group({
      email:  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    this.isLoading = true;
    this.clearErrors();
    this.authService.resetPassword(form.value)
        .subscribe(
          (values) => {
            this.success = true;
            this.isLoading = false;
          },
          (msg) => {
            this.success = false;
            this.error = true;
            this.isLoading = false;
            if (msg.json().hasOwnProperty('errors')){
              this.errors = msg.json().errors;
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
