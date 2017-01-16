import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RssCategoryStoreService} from '../../stores/rss-category-store.service';
import { RssChannelStoreService} from '../../stores/rss-channel-store.service';
import { RssCategory } from '../../stores/interfaces/rss-category.interface';
import { RssChannel } from '../../stores/interfaces/rss-channel.interface';

@Component({
  selector: 'app-rss-channels',
  templateUrl: './rss-channels.component.html',
  styleUrls: ['./rss-channels.component.css']
})
export class RssChannelsComponent implements OnInit, OnDestroy {
  public rssCategories: Observable<RssCategory[]>;
  private categoriesSub: Subscription;
  public rssChannels: Observable<RssChannel[]>;

  constructor(public rssCategoryStore: RssCategoryStoreService, public rssChannelStore: RssChannelStoreService) { }

  ngOnInit() {
    this.rssCategoryStore.resetStore();
    this.rssChannelStore.resetStore();
    this.rssChannels = this.rssChannelStore.items;
    this.rssCategories = this.rssCategoryStore.items;
    this.rssCategoryStore.findAll();
    this.categoriesSub = this.rssCategoryStore.items.subscribe( event => {
      console.log("TODO set selected first category");
    });
  }

  ngOnDestroy() {
    this.categoriesSub.unsubscribe();
  }

  onRssCategoryChange(event) {
    this.rssChannelStore.resetStore();
    this.rssChannelStore.findAll({ rss_category_id: event })
  }

  onScrollDown() {
    this.rssChannelStore.getNextPage();
  }

}
