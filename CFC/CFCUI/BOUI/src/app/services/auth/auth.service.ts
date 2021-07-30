import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
  }

  getToken(): string {
    let customerDetails = JSON.parse(localStorage.getItem('backOfficeDetails') || '{}');
    return customerDetails.token;
  }

  isLoggedIn(){
    let token = this.getToken();
    if(!token)
      return false;
    let isExpired = this.jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  login(credentials) {
    debugger;
    return this.http.post<any>('https://recyclingforrewardsboapi20210728174246.azurewebsites.net/api/Account/Login', credentials)
  }

  logout() {
    localStorage.removeItem('backOfficeDetails');
    if(!localStorage.getItem('backOfficeDetails')) {
      this.router.navigate(['login']);
    }
  }

  get currentUser(){
    let currentUserDetails = JSON.parse(localStorage.getItem('backOfficeDetails') || '{}');
    if(!currentUserDetails)
      return null;    
     
    return this.jwtHelper.decodeToken(currentUserDetails.token);
  }
}
