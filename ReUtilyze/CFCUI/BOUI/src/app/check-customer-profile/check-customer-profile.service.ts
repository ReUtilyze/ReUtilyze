import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckCustomerProfileService {
  private url = 'api/v1/Account/CheckCustomerProfile';
  private customerProfileEmpty: boolean;
  constructor(private http: HttpClient) { }

  checkCustomerProfile(credentials){
    return this.http.get(environment.apiUrl + this.url + '?UserName='+credentials.userName+'&Role='+credentials.role);
  }
}
