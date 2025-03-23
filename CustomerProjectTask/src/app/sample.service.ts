import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './Model/customer';
import { text } from 'node:stream/consumers';


@Injectable({
  providedIn: 'root'
})
export class SampleService {
url='https://localhost:7245/api/Customer';
url1='https://localhost:7245/api/Customer/city'
url2='https://localhost:7245/api/Customer/update';
  constructor(private http:HttpClient) { }

  getcity(){
    return this.http.get(this.url1);
  }
  custpost(obj:Customer){
    return this.http.post(this.url,obj);
  }
  getcustomer(){
    return this.http.get(this.url);
  }

  deletecust(id:any){
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'});

  }
  updatecust(obj: any) {
    return this.http.put(this.url2,obj,{responseType:'text'});
  }
  
}
