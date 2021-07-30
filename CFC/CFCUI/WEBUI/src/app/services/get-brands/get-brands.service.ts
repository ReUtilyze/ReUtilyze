import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetBrandsService {
  url='api/Brand/GetBrand?categoryId=';
  constructor(private http: HttpClient) { }

  get(id: string){
    return this.http.get(environment.apiUrl + this.url + id);
  }
}
