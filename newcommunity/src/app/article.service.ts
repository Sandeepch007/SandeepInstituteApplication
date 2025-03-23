import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from './models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
url='https://localhost:7246/api/Article';
  constructor(private http:HttpClient) { }

  getarticles(){
    return this.http.get(this.url);
  }

  postarticle(obj:Article){
      return this.http.post(this.url,obj);
    }
    updatearticle(obj:any){
      return this.http.put(this.url,obj,{ responseType: 'text' });
    }

    articledelete(id:any){
      return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
    }
  
}
