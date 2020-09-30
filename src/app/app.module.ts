import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SitelayoutModule} from './sitelayout/sitelayout.module';
import {UserModule} from './user/user.module';
import {SitepagesModule} from './sitepages/sitepages.module';
import {DataService} from './service/data.service';
import {WebApiService} from './service/web-api.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './service/auth.service';
import {SocialAuthService} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,

    SitelayoutModule,
    UserModule,
    SitepagesModule
  ],
  providers: [
    DataService,
    WebApiService,
    AuthService,
    SocialAuthService,
    HttpClient,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
