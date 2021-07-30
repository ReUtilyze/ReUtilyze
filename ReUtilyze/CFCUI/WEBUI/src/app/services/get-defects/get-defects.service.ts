import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetDefectsService {

  url='api/Defect/GetDefect?VariantId=';
  constructor(private http: HttpClient) { }

  get(id: string){
    return this.http.get(environment.apiUrl + this.url + id);
  }
}
