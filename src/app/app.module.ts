import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgSemanticModule } from 'ng-semantic';
import { Ng2Webstorage } from 'ng2-webstorage';

import { AppComponent } from './app.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthServicesModule } from './auth/auth-services.module';
import { StoresModule } from './stores/stores.module';
@NgModule({
  declarations: [
    AppComponent,
    UserSettingsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgSemanticModule,
    Ng2Webstorage,
    AuthServicesModule.forRoot(),
    AppRoutingModule,
    StoresModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
