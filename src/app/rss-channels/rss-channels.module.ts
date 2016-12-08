import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';
import { RssChannelsSharedModule } from './rss-channels-shared.module';
import { RssChannelComponent } from './rss-channel/rss-channel.component';

@NgModule({
  imports: [
    RssChannelsSharedModule,
    RouterModule.forChild([
      { path: ':slug', component: RssChannelComponent }
    ])
  ]
})
export class RssChannelsModule { }
