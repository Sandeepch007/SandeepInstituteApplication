import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url='https://localhost:7246/api/ContactReview/GetAllContacts';
  url1='https://localhost:7246/api/ContactReview/postcontact';

  constructor(private http:HttpClient) { }
  getquestions(){
      return this.http.get(this.url);
    }
  
    create(obj:any){
      return this.http.post(this.url1,obj, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      });
    }
}
