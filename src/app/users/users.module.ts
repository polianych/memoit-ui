import { NgModule } from '@angular/core';
import { BaseSharedModule} from '../shared/base-shared.module';
import { RouterModule } from '@angular/router';
import { PostsSharedModule } from '../posts/posts-shared.module';
import { UsersSharedModule } from './users-shared.module';
import { UserComponent } from './user/user.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserSubscriptionsComponent } from './user-subscriptions/user-subscriptions.component';

@NgModule({
  imports: [
    UsersSharedModule,
    RouterModule.forChild([
      { path: ':nickname', component: UserComponent, children: [
          { path: '', component: UserPostsComponent },
          { path: 'subscriptions', component: UserSubscriptionsComponent }
        ]
      }
    ])
  ]
})
export class UsersModule { }
