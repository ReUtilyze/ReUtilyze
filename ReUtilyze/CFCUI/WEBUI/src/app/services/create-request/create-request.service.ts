import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateRequestService {
  private url='api/RecycleRequest/Create'
  constructor(private http: HttpClient) { }

  post(data: any){
    return this.http.post(environment.apiUrl + this.url, data);
  }
}
