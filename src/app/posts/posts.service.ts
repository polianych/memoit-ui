import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../auth/services/auth.service';
import { Post } from './post.interface'
import 'rxjs/add/operator/toPromise';

interface PostQuery {
  page?: number,
  publisher_type?: string,
  publisher_id?: number
}
@Injectable()
export class PostsService {
  private _posts: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  public posts: Observable<Post[]> = this._posts.asObservable();
  public current_page: BehaviorSubject<number> = new BehaviorSubject(1);
  public total_pages: BehaviorSubject<number> = new BehaviorSubject(0);
  private query: PostQuery = {};

  constructor(public authService: AuthService) {
  }

  getPosts(query?: PostQuery) {
    if (query){
      this.query = query;
    }
    if (query && query.hasOwnProperty('page') && query.page > this.total_pages.getValue()){
      console.log('This is DNO of posts!');
      return;
    }
    this.authService
      .get('/api/posts', query)
      .subscribe( (response) => {
        let _p = this._posts.getValue()
        _p = _p.concat(response.json().posts as Post[])
        this._posts.next(_p);
        this.current_page.next(response.json().meta.current_page);
        this.total_pages.next(response.json().meta.total_pages);
      })
  }

  getNextPage() {
    this.query.page = this.current_page.getValue() + 1;
    this.getPosts(this.query);
  }

  createUserPost(values: Object) {
    let body = JSON.stringify({ post: values});
    this.authService
      .post('/api/posts', body)
      .subscribe(response => {
        let _p = this._posts.getValue()
        _p.unshift(response.json().post as Post)
        this._posts.next(_p)
      });
  }

  resetStore() {
    this.query = { page: 1}
    this._posts.next([]);
    this.current_page.next(1)
    this.total_pages.next(0)
  }
}
