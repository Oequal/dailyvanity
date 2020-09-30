import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import {environment} from '../../environments/environment';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [LoginComponent, ProfileComponent],
  imports: [
    CommonModule,
    SocialLoginModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FlexLayoutModule
  ],
  exports: [
    LoginComponent,
    ProfileComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.google_api_key),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ]
})
export class UserModule { }
