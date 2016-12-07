import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostStoreService } from './post-store.service';
import { UserStoreService } from './user-store.service';
import { RssChannelStoreService } from './rss-channel-store.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PostStoreService,
    UserStoreService,
    RssChannelStoreService
  ]
})
export class StoresModule { }
