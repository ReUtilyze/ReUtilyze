import { AuthService } from './../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  formSubmitted: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
    if (this.authService.isLoggedIn()) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get form(){return this.loginForm.controls;}

  signIn() {
    this.formSubmitted = true;
    let credentials = { userName: this.loginForm.value.email, password: this.loginForm.value.password };
    if(this.loginForm.valid){
      this.authService.login(credentials)
      .subscribe(
        (data:any) => {
          if(data.token){
            // this.loading = false;
            // this.invalidLogin = false;
            localStorage.setItem('token', JSON.stringify(data));
            this.router.navigate([this.returnUrl]);
          }
          else
          {
            // this.loading = false;
            // this.invalidLogin = true;
          }
        }
      );
    }
  }
}
