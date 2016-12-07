import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UserStoreService } from '../../stores/user-store.service';
import { PostStoreService } from '../../stores/post-store.service';
import { User } from '../../stores/interfaces/user.interface';
import { Post } from '../../stores/interfaces/post.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;
  public userPosts: Observable<Post[]>;
  constructor(
    private userStore: UserStoreService,
    private postStore: PostStoreService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.postStore.resetStore();
      this.userPosts = this.postStore.items;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userStore.find(params['nickname']).subscribe((user) => {
        console.log('user', user);
        this.user = user as User;
        this.postStore.findAll({ publisher_type: 'User', publisher_id: this.user.id });
      });
    })
  }

}
