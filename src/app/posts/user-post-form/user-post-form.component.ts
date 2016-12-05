import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post.interface';

@Component({
  selector: 'app-user-post-form',
  templateUrl: './user-post-form.component.html',
  styleUrls: ['./user-post-form.component.css']
})
export class UserPostFormComponent implements OnInit {
  public form: FormGroup;

  constructor(public fb: FormBuilder, public postService: PostService) {
    this.form = fb.group({
      content:  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    this.postService.createUserPost(form.value)
    this.form.reset();
  }

}
