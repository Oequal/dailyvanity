import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/data.service';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userLoggedIn: boolean;
  userName: string;
  userImage: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userProvider: string;
  constructor(
    private authService: AuthService,
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.data.currentUserLoggedIn.subscribe((userLoggedIn) => this.userLoggedIn = userLoggedIn);
    this.data.currentUserName.subscribe((userName) => this.userName = userName);
    this.data.currentUserName.subscribe((userName) => this.userName = userName);
    this.data.currentUserImage.subscribe((userImage) => this.userImage = userImage);
    this.data.currentUserEmail.subscribe((userEmail) => this.userEmail = userEmail);
    this.data.currentUserFirstName.subscribe((userFirstName) => this.userFirstName = userFirstName);
    this.data.currentUserLastName.subscribe((userLastName) => this.userLastName = userLastName);
    this.data.currentUserProvider.subscribe((userProvider) => this.userProvider = userProvider);

    return;
  }
}
