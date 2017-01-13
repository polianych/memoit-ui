import { NgModule } from '@angular/core';
imoprt { RouterModule } from '@angular/router';
import { BaseSharedModule } from '../shared/base-shared.module';
import { CommonModule } from '@angular/common';
import { SubscriptionsSharedModule } from './subscriptions-shared.module';
import { SubscriptionsComponent } from './subscriptions.component';

@NgModule({
  imports: [
    BaseSharedModule,
    SubscriptionsSharedModule,
    RouterModule.forChild([
      { path: '', component: SubscriptionsComponent }
    ])
  ]
})
export class SubscriptionsModule { }
