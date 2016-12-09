import { NgModule } from '@angular/core';
import { BaseSharedModule } from '../shared/base-shared.module';
import { CommonModule } from '@angular/common';
import { SubscriptionsSharedModule } from './subscriptions-shared.module';

@NgModule({
  imports: [
    BaseSharedModule,
    SubscriptionsSharedModule
  ]
})
export class SubscriptionsModule { }
