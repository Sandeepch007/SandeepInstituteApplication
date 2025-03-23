import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from './Models/register';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
url='https://localhost:7217/api/Hospital';
  constructor(private http:HttpClient) { }
  getques(){
    return this.http.get(this.url);
  }
  postreg(obj:Register){
    return this.http.post(this.url,obj,{responseType:'text'});
  }
}
