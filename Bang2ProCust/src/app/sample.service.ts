import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProCust } from './Model/pro-cust';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
url='https://localhost:7016/api/ProCust';
  constructor(private http:HttpClient) { }
  getpros(){
    return this.http.get(this.url);
  }
  postpro(obj:ProCust){
    return this.http.post(this.url,obj);
  }
  updatepro(obj:ProCust){
    return this.http.put(this.url,obj,{responseType:'text'});
  }
  deletepro(id:any){
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'})
  }
}
