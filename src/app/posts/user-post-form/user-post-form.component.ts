import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { PostsService } from '../posts.service';
import { Post } from '../post.interface';

@Component({
  selector: 'app-user-post-form',
  templateUrl: './user-post-form.component.html',
  styleUrls: ['./user-post-form.component.css']
})
export class UserPostFormComponent implements OnInit {
  @Output('postCreated') postCreated: EventEmitter<Post> = new EventEmitter();
  public form: FormGroup;

  constructor(public fb: FormBuilder, public postsService: PostsService) {
    this.form = fb.group({
      content:  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    this.postsService.createUserPost(form.value).then((post)=> {
      this.postCreated.emit(post);
      this.form.reset();
    });
  }

}
