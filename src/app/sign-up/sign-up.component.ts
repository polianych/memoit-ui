import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  error: boolean = false;

  constructor(public authService: AuthService, public fb: FormBuilder, public router: Router) {
    this.form = fb.group({
      email:  ['', Validators.required],
      nickname:  ['', Validators.required],
      password:  ['', Validators.required],
      password_confirmation:  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    this.authService.signUp(form.value)
        .subscribe( (values) => {}, (msg) => { console.log(msg); this.error = true; }
    );
  }

}
