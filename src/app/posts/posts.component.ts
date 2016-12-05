import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { PostService } from './post.service';
import { Post } from './post.interface';
import { AuthService } from '../auth/services/auth.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts: Observable<Post[]>;

  constructor(public postService: PostService, public authService: AuthService) {
    this.posts = this.postService.posts;
    this.posts.subscribe( (value)=>{
      console.log('posts count', value.length);
    })
  }

  ngOnInit() {
    this.postService.getPosts();
  }

  ngOnDestroy() {
    this.postService.resetStore()
  }

}
