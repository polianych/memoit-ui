import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Post } from './post.interface';
import { AuthService } from '../auth/services/auth.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: Post[];

  constructor(public postsService: PostsService, public authService: AuthService) {
  }

  ngOnInit() {
    this.postsService.getPosts().then( (posts) => this.posts = posts)
  }

  onPostCreated(post) {
    this.posts.unshift(post);
  }

}
