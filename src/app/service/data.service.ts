import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
* This service is created to user data between multiple components and it gives live update of any change in data with any action
* */
export class DataService {

  private userLoggedInSource = new BehaviorSubject(false);
  currentUserLoggedIn = this.userLoggedInSource.asObservable();

  private userNameSource = new BehaviorSubject('');
  currentUserName = this.userNameSource.asObservable();

  private userImageSource = new BehaviorSubject('');
  currentUserImage = this.userImageSource.asObservable();

  private userEmailSource = new BehaviorSubject('');
  currentUserEmail = this.userEmailSource.asObservable();

  private userFirstNameSource = new BehaviorSubject('');
  currentUserFirstName = this.userFirstNameSource.asObservable();

  private userLastNameSource = new BehaviorSubject('');
  currentUserLastName = this.userLastNameSource.asObservable();

  private userProviderSource = new BehaviorSubject('');
  currentUserProvider = this.userProviderSource.asObservable();


  constructor() { }

  changeUserLoggedIn(userLoggedIn: boolean): void{
    this.userLoggedInSource.next(userLoggedIn);
  }
  changeUserName(userName: string): void{
    this.userNameSource.next(userName);
  }
  changeUserImage(userImage: string): void{
    this.userImageSource.next(userImage);
  }
  changeUserEmail(userEmail: string): void{
    this.userEmailSource.next(userEmail);
  }
  changeUserFirstName(userFirstName: string): void{
    this.userFirstNameSource.next(userFirstName);
  }
  changeUserLastName(userLastName: string): void{
    this.userLastNameSource.next(userLastName);
  }
  changeUserProvider(userProvider: string): void{
    this.userProviderSource.next(userProvider);
  }
}
