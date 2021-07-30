import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerRegistration } from 'src/app/_models/customer-register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterCustomerService {
  url = 'api/Account/register';
  constructor(private http: HttpClient) { }

  post(body: CustomerRegistration){
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.http.post(environment.apiUrl + this.url, body, { headers: header });
  }
}
