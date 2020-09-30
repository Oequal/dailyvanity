import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {DataService} from '../../service/data.service';
import {AuthService} from '../../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  auth: AuthService;

  userLoggedIn;
  userName: string;
  userImage: string;
  userEmail: string;
  constructor(
    private authService: AuthService,
    private data: DataService
  ) {
    this.auth = this.authService;
  }
  ngOnInit(): void {
    this.data.currentUserLoggedIn.subscribe((userLoggedIn) => this.userLoggedIn = userLoggedIn);
    this.data.currentUserName.subscribe((userName) => this.userName = userName);
    this.data.currentUserImage.subscribe((userImage) => this.userImage = userImage);
    this.data.currentUserEmail.subscribe((userEmail) => this.userEmail = userEmail);
  }
  signIn(): void{
    this.authService.login();
  }
  signOut(): void{
    this.authService.logout();
  }
}
