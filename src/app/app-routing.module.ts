import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './helper/auth.guard';
import {LoginComponent} from './user/login/login.component';
import {ProfileComponent} from './user/profile/profile.component';
import {AboutComponent} from './sitepages/about/about.component';
import {ContactComponent} from './sitepages/contact/contact.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
