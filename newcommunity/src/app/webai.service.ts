import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { Userregister } from './models/userregister.class';
import { json } from 'stream/consumers';
import { Login } from './models/login';
import { Forgot } from './models/forgot';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class WebaiService {

  
  getques='https://localhost:7246/api/Login/GetAllQuestions';
  reg='https://localhost:7246/api/Login/registration';
  baseUrl = 'https://localhost:7246/api/Login/GetUserDetails/username/pwd';
  frgt='https://localhost:7246/api/Login/Getpassword/username/answer/question';
  constructor(private http:HttpClient) { }
  getquestions(){
    return this.http.get(this.getques);
  }

  create(obj:Userregister){
    return this.http.post(this.reg,obj, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  logindata(log: Login) {
  
    const params = new HttpParams()
      .set('username', log.username?? '')
      .set('password', log.password?? '');
  
    return this.http.get(this.baseUrl, { params,responseType: 'json'   });
  }
  
  forgtpswd(obj:Forgot){
    const params = new HttpParams()
      .set('username', obj.username?? '')
      .set('answer', obj.secanswer?? '')
      .set('question', obj.secquestion?? '');
      return this.http.get(this.frgt,{params,responseType:'text'});
  }
  
}
