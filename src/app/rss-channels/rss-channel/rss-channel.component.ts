import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RssChannel } from '../../stores/interfaces/rss-channel.interface';
import { RssChannelStoreService } from '../../stores/rss-channel-store.service';
import { PostStoreService } from '../../stores/post-store.service';
import { Post } from '../../stores/interfaces/post.interface';

@Component({
  selector: 'app-rss-channel',
  templateUrl: './rss-channel.component.html',
  styleUrls: ['./rss-channel.component.css']
})
export class RssChannelComponent implements OnInit, OnDestroy {
  public rssChannel: RssChannel;
  public rssChannelPosts: Observable<Post[]>;
  private _rssSub: Subscription;
  constructor(
    private rssChannelStore: RssChannelStoreService,
    private postStore: PostStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.postStore.resetStore();
      this.rssChannelPosts = this.postStore.items;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.rssChannelStore.find(params['slug']);
      this._rssSub = this.rssChannelStore.item.subscribe((rss_channel) => {
        this.rssChannel = rss_channel as RssChannel;
        this.postStore.findAll({ publisher_type: 'RssChannel', publisher_id: this.rssChannel.id });
      });
    })
  }

  ngOnDestroy() {
    this._rssSub.unsubscribe();
  }

}
