import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostsSharedModule } from '../posts/posts-shared.module';
import { SubscriptionsSharedModule } from '../subscriptions/subscriptions-shared.module';
import { BaseSharedModule} from '../shared/base-shared.module';
import { RssChannelComponent } from './rss-channel/rss-channel.component';
import { RssChannelsComponent } from './rss-channels/rss-channels.component';

@NgModule({
  imports: [
    BaseSharedModule,
    PostsSharedModule,
    SubscriptionsSharedModule
  ],
  declarations: [ RssChannelComponent, RssChannelsComponent ],
  exports: [ RssChannelsComponent ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RssChannelsSharedModule { }
