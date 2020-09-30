import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dvtest app is running!';

  constructor(
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
  }
}
