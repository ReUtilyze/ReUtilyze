import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RegisterCustomerService } from 'src/app/services/register-customer/register-customer.service';
import { CustomerRegistration } from 'src/app/_models/customer-register';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  public formSubmitted: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private customerRegisterService: RegisterCustomerService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get form(){return this.registrationForm.controls;}

  registerUser(){
    let data: CustomerRegistration =  { name: this.registrationForm.value.firstName + ' ' + this.registrationForm.value.lastName, email: this.registrationForm.value.email, mobileNo: this.registrationForm.value.mobile, password: this.registrationForm.value.password }
    this.formSubmitted = true;
    if(this.registrationForm.valid){
      this.customerRegisterService.post(data)
      .subscribe((response: any)=>{
        //console.log(response.token);
        if(response.token){
          localStorage.setItem('token', JSON.stringify(response));
          this.router.navigate(['/web/customer/recycle-product']);
        }else{

        }
      })
    }
  }

}
