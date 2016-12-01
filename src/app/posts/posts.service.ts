import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Post } from './post.interface'
import 'rxjs/add/operator/toPromise';


@Injectable()
export class PostsService {

  constructor(public authService: AuthService) { }


  getPosts(page = 1): Promise<Post[]>{
    return this.authService
      .get('/api/posts?page='+page)
      .toPromise()
      .then(response => response.json().posts as Post[])
  }

  createUserPost(values: Object): Promise<Post>{
    let body = JSON.stringify({ post: values});
    return this.authService
      .post('/api/posts', body)
      .toPromise()
      .then(response => response.json().post as Post)
  }
}
