import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
url='https://localhost:7258/api/User';

  constructor(private http:HttpClient,) { }
  getallques(){
    return this.http.get(this.url);
  }

  getuserslist(){
    return this.http.get(`${this.url}/userslst`);
  }

  postusers(obj:any){
return this.http.post(this.url,obj)
  }

  logindata(log: any) {
  
    const params = new HttpParams()
      .set('username', log.username?? '')
      .set('password', log.password?? '');
  
    return this.http.get(`${this.url}/login`, { params,responseType: 'text'   });
  }

  forgotpwd(log?: any) {
  
    const params = new HttpParams()
      .set('username', log.username?? '')
      .set('hint', log.hint?? '')
      .set('secquestion', log.secquesname?? '');
  
    return this.http.get(`${this.url}/username/hint/secquesname`, { params,responseType: 'text'   });
  }
}
