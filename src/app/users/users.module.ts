import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';
import { PostsModule } from '../posts/posts.module';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    NgSemanticModule,
    FormsModule,
    ReactiveFormsModule,
    PostsModule,
    RouterModule.forChild([
      { path: ':nickname', component: UserComponent }
    ])
  ],
  declarations: [UserComponent]
})
export class UsersModule { }
