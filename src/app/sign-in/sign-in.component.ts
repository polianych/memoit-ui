import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;

  constructor(public authService: AuthService, public fb: FormBuilder, public router: Router) {
    this.form = fb.group({
      email:  ['', Validators.required],
      password:  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    this.authService.signIn(form.value)
        .subscribe( (values) => {}, error => { console.log(error); this.error = true; }
        );
  }

}
