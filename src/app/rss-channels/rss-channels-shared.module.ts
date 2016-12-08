import { NgModule } from '@angular/core';
import { PostsSharedModule } from '../posts/posts-shared.module';
import { BaseSharedModule} from '../shared/base-shared.module';
import { RssChannelComponent } from './rss-channel/rss-channel.component';
import { RssChannelsComponent } from './rss-channels/rss-channels.component';

@NgModule({
  imports: [
    BaseSharedModule,
    PostsSharedModule
  ],
  declarations: [ RssChannelComponent, RssChannelsComponent ],
  exports: [ RssChannelsComponent ]
})
export class RssChannelsSharedModule { }
