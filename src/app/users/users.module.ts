import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { PostsModule } from '../posts/posts.module';
import { UserComponent } from './user/user.component';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    NgSemanticModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    PostsModule,
    RouterModule.forChild([
      { path: ':nickname', component: UserComponent }
    ])
  ],
  declarations: [UserComponent],
  providers: [UserService]
})
export class UsersModule { }
