import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './Model/product';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
url='https://localhost:7097/api/Product';
  constructor(private http:HttpClient) { }
  getpros(){
    return this.http.get(this.url);
  }
  postpro(obj:Product){
    return this.http.post(this.url,obj);
  }
  updatepro(obj:Product){
    return this.http.put(this.url,obj,{responseType:'text'});
  }
  deletepro(id:any){
    return this.http.delete(`${this.url}/${id}`,{responseType:'text'})
  }
}
