import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  signup(data: any) {
    return this.http.post(this.url + '/users/singup', data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }

  forgotPassword(data: any) {
    return this.http.post(this.url + '/users/forgotPass', data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }

  login(data: any) {
    const res = this.http.post(this.url + '/users/login', data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
    return res;
  }

  checkToken(){
    return this.http.get(this.url + '/users/checkToken');
  }

  changePassword(data: any){
    console.log("hi")
    return this.http.post(this.url + '/users/changePassword', data,  {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }
}
