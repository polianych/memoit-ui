import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseSharedModule} from '../shared/base-shared.module';
import { UserSettingsComponent } from './user-settings.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    BaseSharedModule,
    RouterModule.forChild([
      { path: '', component: UserSettingsComponent, children: [
          { path: 'profile', component: UpdateProfileComponent },
          { path: 'password', component: ChangePasswordComponent }
        ]
      }
    ]),
  ],
  declarations: [UserSettingsComponent, UpdateProfileComponent, ChangePasswordComponent]
})
export class UserSettingsModule { }
