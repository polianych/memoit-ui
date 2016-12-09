import { Injectable } from '@angular/core';
import { BaseStore } from './base-store';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class SubscriptionStoreService extends BaseStore {
  protected store_endpoint: string = '/api/subscriptions';
  protected singular_key: string = 'subscription';
  protected plural_key: string = 'subscriptions';

  constructor(protected authService: AuthService) {
    super(authService)
  }
}
