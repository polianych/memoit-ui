import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AuthService } from './auth/services/auth.service';
import { UnauthorizedCanActivateService } from './auth/services/unauthorized-canactivate.service';

const routes = [
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: 'settings', component: UserSettingsComponent, canActivate: [AuthService] },
  { path: 'auth',  loadChildren: 'app/auth/auth.module#AuthModule', data: { preload: true } },
  { path: 'posts', loadChildren: 'app/posts/posts.module#PostsModule' },
  { path: 'user',  loadChildren: 'app/users/users.module#UsersModule' },
  { path: 'rss_channel', loadChildren: 'app/rss-channels/rss-channels.module#RssChannelsModule' },
  { path: 'discover', loadChildren: 'app/discover/discover.module#DiscoverModule' }
]
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
