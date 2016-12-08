import { Component, OnInit, Input } from '@angular/core';
import { PostStoreService } from '../../stores/post-store.service';
import { Post } from '../../stores/interfaces/post.interface';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent implements OnInit {
  @Input('posts') posts: Post[];
  constructor(public postStore: PostStoreService) { }

  ngOnInit() {
  }

  onScrollDown() {
    this.postStore.getNextPage();
  }

}
