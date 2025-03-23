import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Postquerry } from './models/postquerry';
import { query } from 'express';
import { Reply } from './models/reply';
import { text } from 'node:stream/consumers';
@Injectable({
  providedIn: 'root'
})
export class ForumService implements OnInit {
  private forumData: any = null;
url='https://localhost:7246/api/Forums';
urll='https://localhost:7246/api/Forums/Forumsreply';
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    
  }
  getforums(){
    return this.http.get(this.url);
  }
  delforum(id:string){
    return this.http.delete(`${this.url}/forumsdelete/${id}`,{ responseType: 'text' })
  }
  postforum(obj:Postquerry){
    return this.http.post(this.url,obj);
  }
  updateforums(obj:any){
    return this.http.put(this.url,obj,{ responseType: 'text' });
  }


 

  setForums(data: any): void {
    this.forumData = data;
  }

  // Retrieve stored forum data
  getStoredForum(): any {
    return this.forumData;
  }

  replyforumpost(obj:Reply){
    return this.http.post(this.urll,obj);
  }

  replyget(){
    return this.http.get(`${this.url}/forumsreply`);
  }
  replyupdate(obj:any){
    return this.http.put(`${this.url}/updatereplyforum`,obj,{responseType:'text'});
  }

  replydelete(id:any){
    return this.http.delete(`${this.url}/deleteforumsreply/${id}`,{ responseType: 'text' })
  }
}
