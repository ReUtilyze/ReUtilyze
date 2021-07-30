import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetVarientDetailsService {

  url='api/Varient/GetVarientsByVarientId/';
  constructor(private http: HttpClient) { }

  get(id: string){
    return this.http.get(environment.apiUrl + this.url + id);
  }
}
