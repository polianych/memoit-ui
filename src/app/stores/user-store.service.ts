import { Injectable } from '@angular/core';
import { BaseStore } from './base-store';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class UserStoreService extends BaseStore {
  protected store_endpoint: string = '/api/users';
  protected singular_key: string = 'user';
  protected plural_key: string = 'users';

  constructor(protected authService: AuthService) {
    super(authService)
  }
}
