import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProService {
url='https://localhost:7044/api/Product/category';
url1='https://localhost:7044/api/Product';
  constructor(private http:HttpClient) { }

  getcategory(){
    return this.http.get(this.url);
  }
  postpro(obj:any){
    return this.http.post(this.url1,obj);
  }

  getpro(){
    return this.http.get(this.url1);
  }
}
