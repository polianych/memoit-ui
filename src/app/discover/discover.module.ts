import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseSharedModule} from '../shared/base-shared.module';
import { RssChannelsSharedModule } from '../rss-channels/rss-channels-shared.module';
import { DiscoverComponent } from './discover.component';

@NgModule({
  imports: [
    BaseSharedModule,
    RssChannelsSharedModule,
    RouterModule.forChild([
      { path: '', component: DiscoverComponent }
    ])
  ],
  declarations: [ DiscoverComponent ]
})
export class DiscoverModule { }
