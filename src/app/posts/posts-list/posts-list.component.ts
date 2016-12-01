import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.interface';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent implements OnInit {
  @Input('posts') posts: Post[];
  constructor() { }

  ngOnInit() {
  }

}
