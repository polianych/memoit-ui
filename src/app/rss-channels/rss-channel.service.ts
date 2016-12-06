import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../auth/services/auth.service';
import { RssChannel } from './rss-channel.interface';
import 'rxjs/add/operator/map';

export interface RssChannelQuery {
  slug: string
}
@Injectable()
export class RssChannelService {

  constructor(public authService: AuthService) { }

  getRssChannel(query: RssChannelQuery): Observable<RssChannel> {
    return this.authService
      .get('/api/rss_channels/' + query.slug).map((response) => { return response.json().rss_channel as RssChannel;})
  }

}
