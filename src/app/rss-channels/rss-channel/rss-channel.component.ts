import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../posts/post.interface';
import { RssChannel } from '../rss-channel.interface';
import { RssChannelService } from '../rss-channel.service';
import { PostService } from '../../posts/post.service';

@Component({
  selector: 'app-rss-channel',
  templateUrl: './rss-channel.component.html',
  styleUrls: ['./rss-channel.component.css']
})
export class RssChannelComponent implements OnInit {
  public rssChannel: RssChannel;
  public rssChannelPosts: Observable<Post[]>;
  constructor(
    private rssChannelService: RssChannelService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.postService.resetStore();
      this.rssChannelPosts = this.postService.posts;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.rssChannelService.getRssChannel({slug: params['slug']}).subscribe((rss_channel) => {
        this.rssChannel = rss_channel;
        this.postService.getPosts({ publisher_type: 'RssChannel', publisher_id: this.rssChannel.id });
      });
    })
  }

}
