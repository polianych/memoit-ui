import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { UserStoreService } from '../../stores/user-store.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;
  errors = [];
  errorsFields = {};
  isLoading: boolean = false;

  constructor(public authService: AuthService, public userStore: UserStoreService, public fb: FormBuilder) {
    this.form = fb.group({
      current_password:  ['', Validators.required],
      password:  ['', Validators.required],
      password_confirmation:  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.isLoading = true;
    this.clearErrors();
    this.userStore.update('me', form.value).subscribe( (value) => {
      this.isLoading = false;
      this.authService.currentUser = value;
    }, (error) => {
      this.isLoading = false;
      this.error = true;
      this.isLoading = false;
      if (error.json().hasOwnProperty('errors')){
        this.errors = error.json().errors;
        this.errorsFields = error.json().errors_fields;
      }
    });
  }

  clearErrors() {
    this.error = false;
    this.errorsFields = {};
    this.errors = [];
  }

}
