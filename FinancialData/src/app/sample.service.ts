import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
url='https://localhost:7204/api/AgTable';
  constructor(private http:HttpClient) { }
  gettable(){
    return this.http.get(this.url);
  }
}
