import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { UserStoreService } from '../../stores/user-store.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;
  errors = [];
  errorsFields = {};
  isLoading: boolean = false;

  constructor(public authService: AuthService, public userStore: UserStoreService, public fb: FormBuilder) {
    console.log('update profile comp')
    this.form = fb.group({
      nickname:  [authService.currentUser.nickname, Validators.required],
      name:  [authService.currentUser.name, Validators.required]
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
