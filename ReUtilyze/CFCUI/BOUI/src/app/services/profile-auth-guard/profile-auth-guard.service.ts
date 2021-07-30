import { CheckCustomerProfileService } from 'src/app/check-customer-profile/check-customer-profile.service';  
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileAuthGuard implements CanActivate {
  isCustomerProfile: boolean;
  constructor(private router: Router, private authService: AuthService, private checkCustomerProfileService: CheckCustomerProfileService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    let credentials = { userName: this.authService.currentUser.userName, name: this.authService.currentUser.role };
    //if(this.checkCustomerProfileService.checkCustomerProfile(credentials))return true;
    return new Promise(res => {
      this.checkCustomerProfileService.checkCustomerProfile(credentials).subscribe(
          (data) => {
              if (data === true) {
                  res(true);
              } else {
                this.router.navigate(['login']);
                res(false);
              }
          },
          (error) => {
            this.router.navigate(['login']);
            res(false);
          }
      );
    });
  }
}
