import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import {environment} from '../../environments/environment';

import {CookieService} from 'ngx-cookie-service';
import {StorageMap} from '@ngx-pwa/local-storage';
import {DataService} from './data.service';

import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;
  isLoggedIn = false;
  redirectUrl: string;

  userName: string;
  userImage: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userProvider: string;

  constructor(
    private cookieService: CookieService,
    private storage: StorageMap,
    private data: DataService,
    private socialAuthService: SocialAuthService,
  ) {
    this.isVerifyUser();
  }

  login(): Observable<boolean> {
    this.signInWithGoogle();

    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 15);
    this.cookieService.set('isLoggedIn', 'true', dateNow);

    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }
  logout(): void {
    this.signOutFromSocial();

    this.user = null;
    this.isLoggedIn = false;

    this.data.changeUserLoggedIn(this.isLoggedIn);
    this.data.changeUserName('');
    this.data.changeUserImage('');
    this.data.changeUserEmail('');
    this.data.changeUserFirstName('');
    this.data.changeUserLastName('');
    this.data.changeUserProvider('');

    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 15);
    this.cookieService.set('isLoggedIn', 'false', dateNow);

    this.storage.set('user', this.user).subscribe(() => {});
    this.storage.set('isLoggedIn', this.isLoggedIn).subscribe(() => {});
  }
  async vu(): Promise<boolean> {
    return await new Promise(resolve => {
      this.storage.get('user').subscribe(async (user) => {this.user = user; });
      if (this.user && typeof this.user === 'object')
      {

      }
      // this.storage.get('isLoggedIn').subscribe((isLoggedIn) => this.isLoggedIn = (isLoggedIn === true) ? true : false);
      resolve();
    });
  }
  isVerifyUser(): boolean{
    // console.log('in');
    const lin = this.cookieService.get('isLoggedIn');
    if (lin === 'true'){
      this.isLoggedIn = true;
    }
    // Check if user is logged in or not from storage
    this.storage.get('isLoggedIn').subscribe((isLoggedIn) => {
      // console.log(1);
      // User not found in storage so considering first visit and seeting is logged in to false
      if (isLoggedIn === 'undefined' || isLoggedIn === undefined){
        // console.log(2);
        this.user = null;
        this.isLoggedIn = false;

        // Resetting login related info
        this.storage.set('user', this.user).subscribe(() => {});
        this.storage.set('isLoggedIn', this.isLoggedIn).subscribe(() => {});
      }
      // User logged in info found so check based on it
      else{
        // console.log(3);
        this.isLoggedIn = (isLoggedIn === true) ? true : false;
      }

      // If user found logged in then check for user info
      if (this.isLoggedIn === true)
      {
        // console.log(4);
        this.storage.get('user').subscribe((user) => {
          // We tried to get user and found user info
          // console.log(user);
          if ( user !== undefined && user !== 'undefined' && user != null ){
            // console.log(5);

            this.storage.get('user').subscribe((user) => {
              this.storage.get('isLoggedIn').subscribe((isLoggedIn) => { this.isLoggedIn = (isLoggedIn === true) ? true : false; });

              this.user = user;

              // Set user info as everything is okay
              this.setUserInfo(this.user);

              // console.log(6);
              return true;
            });
          }
          //  We tried to get user but user info not found so make user logged out
          else{
            // console.log(7);
            this.user = null;
            this.isLoggedIn = false;

            // Resetting login related info
            this.storage.set('user', this.user).subscribe(() => {});
            this.storage.set('isLoggedIn', this.isLoggedIn).subscribe(() => {});

            return false;
          }
        });
      }
      // User is not logged in
      else
      {
        // console.log(8);
        this.user = null;
        this.isLoggedIn = false;

        // Resetting login related info
        this.storage.set('user', this.user).subscribe(() => {});
        this.storage.set('isLoggedIn', this.isLoggedIn).subscribe(() => {});

        return false;
      }
    });
    // console.log(9);
    // console.log('out');

    return false;
  }
  setUserInfo(user): void{
    this.user = user;
    this.isLoggedIn = (user != null);

    this.data.changeUserLoggedIn(this.isLoggedIn);
    this.data.changeUserName(this.user.name);
    this.data.changeUserImage(this.user.photoUrl);
    this.data.changeUserEmail(this.user.email);
    this.data.changeUserFirstName(this.user.firstName);
    this.data.changeUserLastName(this.user.lastName);
    this.data.changeUserProvider(this.user.provider);
  }
  signInWithGoogle(): void{
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.setUserLoginStatusFromSocial();
  }
  signOutFromSocial(): void{
    this.socialAuthService.signOut();
  }
  setUserLoginStatusFromSocial(): void{
    this.socialAuthService.authState.subscribe((user) => {
      if ( user != null ){
        this.setUserInfo(user);

        // Set logged user info in indexed db
        this.storage.set('user', this.user).subscribe(() => {});
        this.storage.set('isLoggedIn', this.isLoggedIn).subscribe(() => {});

        // Create cookie as requested
        const dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 15);

        if (user.provider && user.provider === 'GOOGLE'){
          this.cookieService.set(environment.cookie_acess_key, user.authToken, dateNow);
          this.cookieService.set(environment.cookie_refresh_key, user.idToken, dateNow);
        }
      }
    });
  }
}
