import { NgModule } from '@angular/core';
import { PostsSharedModule } from '../posts/posts-shared.module';
import { BaseSharedModule} from '../shared/base-shared.module';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    BaseSharedModule,
    PostsSharedModule
  ],
  declarations: [ UserComponent ],
  exports: [ UserComponent ]
})
export class RssChannelsSharedModule { }
