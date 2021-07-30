import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class GetClaimRequestDataService {
  tokenType : string= 'Bearer ';
  constructor(private http: HttpClient,private AuthService : AuthService) { }

  getData(id){

    const header = new HttpHeaders().set('Authorization', this.tokenType + this.AuthService.getToken());
    const headers = { headers: header };
    return this.http.get( environment.apiUrl + 'Request/GetRequests/'+id,headers);
  }
  
}
