import { CustomerLogin } from './../../_models/customer-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
  }

  getToken(): string {
    let customerDetails = JSON.parse(localStorage.getItem('token') || '{}');
    return customerDetails.token;
  }

  isLoggedIn(){
    let token = this.getToken();
    if(!token)
      return false;
    let isExpired = this.jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  login(credentials: CustomerLogin) {
    return this.http.post(environment.apiUrl + 'api/Account/Login', credentials);
  }

  logout() {
    localStorage.removeItem('token');
    if(!localStorage.getItem('token')) {
      this.router.navigate(['web/customer/login']);
    }
  }

  get currentUser(){
    let currentUserDetails = JSON.parse(localStorage.getItem('token') || '{}');
    if(!currentUserDetails)
      return null;
    return this.jwtHelper.decodeToken(currentUserDetails.token);
  }

  get firstName(){
    if(!this.currentUser.FullName)
      return '';
    let firstName = this.currentUser.FullName.split(' ')[0];
    if(firstName)
      return firstName;
    else
      return '';
  }

  get lastName(){
    if(!this.currentUser.FullName)
      return '';
    let lastName = this.currentUser.FullName.split(' ')[1];
    if(lastName)
      return lastName;
    else
      return '';
  }
}
