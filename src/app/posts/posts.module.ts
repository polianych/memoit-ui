import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';

import { PostsService } from './posts.service';
import { PostsComponent } from './posts.component';
import { PostsListComponent } from './posts-list/posts-list.component'
import { UserPostFormComponent } from './user-post-form/user-post-form.component'

@NgModule({
  imports: [
    CommonModule,
    NgSemanticModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: PostsComponent }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [PostsComponent, PostsListComponent, UserPostFormComponent],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
