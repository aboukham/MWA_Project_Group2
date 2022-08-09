import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getDetails() {
    const res = this.http.get(this.url + '/details')
   res.subscribe((r) =>  {
    console.log(r);})
    return res;
  }
}
