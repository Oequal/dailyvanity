import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {DataService} from '../../service/data.service';
import {LoginComponent} from '../../user/login/login.component';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit  {
  activeRoute: string;
  arrSiteMenu = [
    {title: 'About', url: 'about'},
    {title: 'Contact', url: 'contact'}
  ];

  @ViewChild(LoginComponent) loginComponent;
  user;
  userLoggedIn: boolean;
  userName: string;
  userImage: string;
  userEmail: string;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {

  }
  name;
  ngOnInit(): void {
    this.data.currentUserLoggedIn.subscribe((userLoggedIn) => this.userLoggedIn = userLoggedIn);
    this.data.currentUserName.subscribe((userName) => this.userName = userName);
    this.data.currentUserImage.subscribe((userImage) => this.userImage = userImage);
    this.data.currentUserEmail.subscribe((userEmail) => this.userEmail = userEmail);
  }
  ngAfterViewInit(): void {
    // this.user = this.loginComponent.user;
  }
}
