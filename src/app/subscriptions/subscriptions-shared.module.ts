import { NgModule } from '@angular/core';
import { BaseSharedModule} from '../shared/base-shared.module';
import { PublisherSubscriptionButtonComponent } from './publisher-subscription-button/publisher-subscription-button.component';

@NgModule({
  imports: [
    BaseSharedModule
  ],
  declarations: [ PublisherSubscriptionButtonComponent ],
  exports: [ PublisherSubscriptionButtonComponent ]
})
export class SubscriptionsSharedModule { }
