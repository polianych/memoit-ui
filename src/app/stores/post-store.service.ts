import { Injectable } from '@angular/core';
import { BaseStore } from './base-store';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class PostStoreService extends BaseStore {
  protected store_endpoint: string = '/api/posts';
  protected singular_key: string = 'post';
  protected plural_key: string = 'posts';

  constructor(protected authService: AuthService) {
    super(authService)
  }
}
