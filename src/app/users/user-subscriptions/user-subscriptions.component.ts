import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/services/auth.service';
import { UserStoreService } from '../../stores/user-store.service';
import { SubscriptionStoreService } from '../../stores/subscription-store.service';
import { User } from '../../stores/interfaces/user.interface';
import { Subscription as UserSubscription } from '../../stores/interfaces/subscription.interface';

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {
  public subscriptions: Observable<UserSubscription[]>;
  public user: Observable<User>;
  private _userSub: Subscription;
  constructor(
    private subscriptionStore: SubscriptionStoreService,
    private userStore: UserStoreService,
    private authService: AuthService
  ) {
    this.user = this.userStore.item;
    this.subscriptions = this.subscriptionStore.items;
  }

  ngOnInit() {
    this.subscriptionStore.resetStore();
    this._userSub = this.userStore.item.subscribe( (user: User)=> {
      if (user.id) {
        this.subscriptionStore.findAll({ user_id: user.id });
      }
    })
  }

  ngOnDestroy() {
    this._userSub.unsubscribe();
  }
  onScrollDown() {
    this.subscriptionStore.getNextPage();
  }


}
