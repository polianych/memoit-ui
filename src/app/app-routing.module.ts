import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AuthService } from './auth/services/auth.service';
import { UnauthorizedCanActivateService } from './auth/services/unauthorized-canactivate.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
      { path: 'settings', component: UserSettingsComponent, canActivate: [AuthService] },
      { path: 'auth',  loadChildren: 'app/auth/auth.module#AuthModule', data: { preload: true } },
      { path: 'posts', loadChildren: 'app/posts/posts.module#PostsModule' },
      { path: 'user',  loadChildren: 'app/users/users.module#UsersModule' },
      { path: 'rss_channel',  loadChildren: 'app/rss-channels/rss-channels.module#RssChannelsModule' }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
