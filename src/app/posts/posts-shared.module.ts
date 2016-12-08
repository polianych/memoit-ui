import { NgModule } from '@angular/core';
import { BaseSharedModule} from '../shared/base-shared.module';
import { PostsComponent } from './posts.component';
import { PostsListComponent } from './posts-list/posts-list.component'
import { UserPostFormComponent } from './user-post-form/user-post-form.component';
import { PostListComponent } from './post-list/post-list.component'

@NgModule({
  imports:[
    BaseSharedModule
  ],
  declarations: [ PostsComponent, PostsListComponent, UserPostFormComponent, PostListComponent],
  exports: [
    PostsListComponent,
    UserPostFormComponent
  ]
})
export class PostsSharedModule { }
