import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:4200';
  constructor(private http: HttpClient) { }

  signup(data: any) {
    return this.http.post(this.url + '/user/signup', data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }

  forgotPassword(data: any) {
    return this.http.post(this.url + '/user/login/forgotPassword', data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }
}
