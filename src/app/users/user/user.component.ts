import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../auth/services/user';
import { Post } from '../../posts/post.interface';
import { UserService } from '../user.service';
import { PostService } from '../../posts/post.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;
  public userPosts: Observable<Post[]>;
  constructor(
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.userPosts = this.postService.posts;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userService.getUser({nickname: params['nickname']}).subscribe((user) => {
        this.user = user;
        this.postService.getPosts({ publisher_type: 'User', publisher_id: this.user.id });
      });
    })
  }

}
