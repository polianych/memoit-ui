import { Injectable } from '@angular/core';
import { BaseStore } from './base-store';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class RssChannelStoreService extends BaseStore {
  protected store_endpoint: string = '/api/rss_channels';
  protected singular_key: string = 'rss_channel';
  protected plural_key: string = 'rss_channels';

  constructor(protected authService: AuthService) {
    super(authService)
  }
}
