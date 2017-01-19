import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RssCategoryStoreService} from '../../stores/rss-category-store.service';
import { RssChannelStoreService} from '../../stores/rss-channel-store.service';
import { RssCategory } from '../../stores/interfaces/rss-category.interface';
import { RssChannel } from '../../stores/interfaces/rss-channel.interface';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-rss-channels',
  templateUrl: './rss-channels.component.html',
  styleUrls: ['./rss-channels.component.css']
})
export class RssChannelsComponent implements OnInit, OnDestroy {
  public selectedCategoryId: number;
  public rssCategories: Observable<RssCategory[]>;
  public rssChannels: Observable<RssChannel[]>;

  constructor(
    public rssCategoryStore: RssCategoryStoreService,
    public rssChannelStore: RssChannelStoreService,
    public element: ElementRef
  ) { }

  ngOnInit() {
    this.selectedCategoryId = null;
    this.rssCategoryStore.resetStore();
    this.rssChannelStore.resetStore();
    this.rssChannels = this.rssChannelStore.items;
    this.rssCategories = this.rssCategoryStore.items;
    this.rssCategoryStore.findAll();
  }

  ngOnDestroy() {
  }

  onRssCategoryChange(event) {
    this.rssChannelStore.resetStore();
    this.selectedCategoryId = event;
    this.rssChannelStore.findAll({ rss_category_id: this.selectedCategoryId })
  }

  onScrollDown() {
    this.rssChannelStore.getNextPage();
  }

}
