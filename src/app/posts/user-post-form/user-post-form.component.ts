import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { PostStoreService } from '../../stores/post-store.service';
import { Post } from '../../stores/interfaces/post.interface';

@Component({
  selector: 'app-user-post-form',
  templateUrl: './user-post-form.component.html',
  styleUrls: ['./user-post-form.component.css']
})
export class UserPostFormComponent implements OnInit {
  public form: FormGroup;

  constructor(public fb: FormBuilder, public postStore: PostStoreService) {
    this.form = fb.group({
      content:  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    this.postStore.create(form.value)
    this.form.reset();
  }

}
