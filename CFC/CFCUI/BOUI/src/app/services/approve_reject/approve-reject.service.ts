import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { approverejectdata } from './../../_models/approverejectdata';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ApproveRejectService {

  tokenType : string= 'Bearer ';
  constructor(private http: HttpClient, private authService : AuthService) { }

  TakeAction(approverejectdata){

    const header = new HttpHeaders().set('Authorization', this.tokenType + this.authService.getToken());
    const headers = { headers: header };
    //var url = environment.apiUrl + 'Request​/GetRequestsCount';
    var url = environment.apiUrl +  'Request/Verify';
    console.log(url);
    return this.http.post( url,approverejectdata,headers);
  }
}