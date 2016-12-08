import { NgModule } from '@angular/core';
import { BaseSharedModule} from '../shared/base-shared.module';
import { RouterModule } from '@angular/router';
import { PostsSharedModule } from '../posts/posts-shared.module';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    BaseSharedModule,
    PostsSharedModule,
    RouterModule.forChild([
      { path: ':nickname', component: UserComponent }
    ])
  ],
  declarations: [UserComponent]
})
export class UsersModule { }
