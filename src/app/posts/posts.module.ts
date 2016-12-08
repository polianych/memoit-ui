import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseSharedModule} from '../shared/base-shared.module';
import { PostsComponent } from './posts.component';
import { PostsSharedModule } from './posts-shared.module';

@NgModule({
  imports: [
    BaseSharedModule,
    PostsSharedModule,
    RouterModule.forChild([
      { path: '', component: PostsComponent }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PostsModule { }
