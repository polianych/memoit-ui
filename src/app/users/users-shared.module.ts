import { NgModule } from '@angular/core';
import { BaseSharedModule} from '../shared/base-shared.module';
import { PostsSharedModule } from '../posts/posts-shared.module';
import { SubscriptionsSharedModule } from '../subscriptions/subscriptions-shared.module';
import { UserComponent } from './user/user.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserSubscriptionsComponent } from './user-subscriptions/user-subscriptions.component';

@NgModule({
  imports: [
    BaseSharedModule,
    PostsSharedModule,
    SubscriptionsSharedModule
  ],
  declarations: [ UserComponent, UserPostsComponent, UserSubscriptionsComponent ],
  exports: [ UserComponent ]
})
export class UsersSharedModule { }
