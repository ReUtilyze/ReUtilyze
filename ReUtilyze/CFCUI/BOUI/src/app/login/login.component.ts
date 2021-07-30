import { AlertService } from './../services/alert/alert.service';
import { AuthService } from '../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formSubmitted: boolean;
  loading: boolean;
  invalidLogin: boolean;
  returnUrl: string;
  error: string;
  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private service: AlertService
  ) {
    if (this.authService.isLoggedIn()) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){return this.loginForm.controls;}

  signIn(credentials: any) {
    debugger;
    this.formSubmitted = true;
    if(this.loginForm.valid){
      this.loading = true;
      this.authService.login(credentials)
      .subscribe(
        data => {
          if(data.token){
            this.loading = false;
            this.invalidLogin = false;
            localStorage.setItem('backOfficeDetails', JSON.stringify(data));
            this.router.navigate([this.returnUrl]);
          }
          else
          {
            this.loading = false;
            this.invalidLogin = true;
          }
        },
        error => {
          this.loading = false;
          this.invalidLogin = true;
          let msg;
          switch(error.error.status) { 
            case 0: { 
              msg = 'Not connected.\n Verify Network.';
              break; 
            } 
            case 404: {
              msg = 'Requested page not found. [404]';
              break; 
            } 
            case 500: { 
              msg = 'Internal Server Error [500].';
              break; 
            }
            case 401: {
              msg = 'Unauthorized user [401].';
              break; 
            } 
            default: { 
              msg = 'Uncaught Error.\n';
              break; 
            }
          } 
          this.service.error(msg);
        }
      );
    }
  }
}
