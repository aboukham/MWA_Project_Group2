import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  add(data: any) {
    return this.http.post(this.url + '/categories/newCategory', data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }
  
  update(data: any) {
    return this.http.patch(this.url + '/categories/', data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }

  getCategories() {

    const res = this.http.get(this.url + '/categories');
    return res;
  }



}
