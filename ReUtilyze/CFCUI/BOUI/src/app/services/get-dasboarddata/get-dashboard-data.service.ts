import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class GetDashboardDataService {

  tokenType : string= 'Bearer ';
  constructor(private http: HttpClient, private AuthService : AuthService) { }

  getData(){

    const header = new HttpHeaders().set('Authorization', this.tokenType + this.AuthService.getToken());
    const headers = { headers: header };
    //var url = environment.apiUrl + 'Request​/GetRequestsCount';
    var url = 'https://recyclingforrewardsboapi20210728174246.azurewebsites.net/api/Request/GetRequestsCount'
    console.log(url);
    return this.http.get( url,headers);
  }
}




