import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetCustomerPointsService {
  url='api/Profile';
  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(environment.apiUrl + this.url);
  }
}
