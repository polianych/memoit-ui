import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseSharedModule} from '../shared/base-shared.module';
import { RssChannelsSharedModule } from '../rss-channels/rss-channels-shared.module';
import { SubscriptionsSharedModule } from '../subscriptions/subscriptions-shared.module';
import { RssChannelsComponent } from '../rss-channels/rss-channels/rss-channels.component';
import { DiscoverComponent } from './discover.component';
import { DiscoverUsersComponent } from './discover-users/discover-users.component';

@NgModule({
  imports: [
    BaseSharedModule,
    RssChannelsSharedModule,
    SubscriptionsSharedModule,
    RouterModule.forChild([
      {
        path: '', component: DiscoverComponent, children: [
          { path: 'rss', component: RssChannelsComponent },
          { path: 'users', component: DiscoverUsersComponent }
        ]
      }
    ])
  ],
  declarations: [ DiscoverComponent, DiscoverUsersComponent ]
})
export class DiscoverModule { }
