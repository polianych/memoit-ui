import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/services/auth.service';
import { UserStoreService } from '../../stores/user-store.service';
import { PostStoreService } from '../../stores/post-store.service';
import { User } from '../../stores/interfaces/user.interface';
import { Post } from '../../stores/interfaces/post.interface';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  public user: Observable<User>;
  public userPosts: Observable<Post[]>;
  private _userSub: Subscription;
  constructor(
    private postStore: PostStoreService,
    private userStore: UserStoreService,
    private authService: AuthService
  ) {
    this.userPosts = this.postStore.items;
    this.user = this.userStore.item;

  }

  ngOnInit() {
    this.postStore.resetStore();
    this._userSub = this.userStore.item.subscribe( (user: User)=> {
      if (user.id) {
        this.postStore.findAll({ publisher_type: 'User', publisher_id: user.id });
      }
    })
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
  }



}
