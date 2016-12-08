import { Injectable } from '@angular/core';
import { BaseStore } from './base-store';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class RssCategoryStoreService extends BaseStore {
  protected store_endpoint: string = '/api/rss_categories';
  protected singular_key: string = 'rss_category';
  protected plural_key: string = 'rss_categories';

  constructor(protected authService: AuthService) {
    super(authService)
  }
}
