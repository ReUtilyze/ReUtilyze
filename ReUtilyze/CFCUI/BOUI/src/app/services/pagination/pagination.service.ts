import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  tokenType : string= 'Bearer ';
  
  constructor(private http: HttpClient,private AuthService : AuthService) { }

  fetchPosts(url): Observable<any> {

    const header = new HttpHeaders().set('Authorization', this.tokenType + this.AuthService.getToken());
    const headers = { headers: header };
    
    return this.http.get(url,headers);

     

  }
}
