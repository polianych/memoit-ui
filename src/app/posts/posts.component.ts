import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { PostStoreService } from '../stores/post-store.service';
import { Post } from '../stores/interfaces/post.interface';
import { AuthService } from '../auth/services/auth.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  public filterOptions = [
    { value: 'all', title: 'All' },
    { value: 'RssChannel', title: 'Rss' },
    { value: 'User', title: 'User' }
  ]
  public posts: Observable<Post[]>;

  constructor(public postStore: PostStoreService, public authService: AuthService) {
    this.postStore.resetStore();
    this.posts = this.postStore.items;
    this.posts.subscribe( (value)=>{
      console.log('posts count', value.length);
    })
  }

  ngOnInit() {
    this.postStore.findAll();
  }

  ngOnDestroy() {
  }

  onFilterChange(event) {
    let item = this.filterOptions.find((x)=> x.title == event).value;
    let params = item == 'all' ? {} : { publisher_type: item };

    this.postStore.resetStore();
    this.postStore.findAll(params);
  }

}
