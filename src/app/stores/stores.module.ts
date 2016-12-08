import { NgModule } from '@angular/core';
import { PostStoreService } from './post-store.service';
import { UserStoreService } from './user-store.service';
import { RssChannelStoreService } from './rss-channel-store.service';
import { RssCategoryStoreService } from './rss-category-store.service';

@NgModule({
  providers: [
    PostStoreService,
    UserStoreService,
    RssChannelStoreService,
    RssCategoryStoreService
  ]
})
export class StoresModule { }
