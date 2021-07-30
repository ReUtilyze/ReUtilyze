import { AuthService } from '../../services/auth/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(){
    console.log('hi');
    if(this.authService.isLoggedIn()) return true;
    this.router.navigate(['web/customer/login']);
    return false;
  }
}
