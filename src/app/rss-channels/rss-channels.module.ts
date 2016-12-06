import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';
import { PostsModule } from '../posts/posts.module';
import { RssChannelService } from './rss-channel.service';
import { RssChannelComponent } from './rss-channel/rss-channel.component';

@NgModule({
  imports: [
    CommonModule,
    NgSemanticModule,
    FormsModule,
    ReactiveFormsModule,
    PostsModule,
    RouterModule.forChild([
      { path: ':slug', component: RssChannelComponent }
    ])
  ],
  providers: [RssChannelService],
  declarations: [RssChannelComponent]
})
export class RssChannelsModule { }
