import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  add(data: any) {
    return this.http.post(this.url + '/products/newProduct', data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }
  
  update(data: any) {
    return this.http.patch(this.url + '/products/', data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }

  getProducts() {
    const res = this.http.get(this.url + '/products');
    return res;
  }

  updateStatus(data: any) {
    return this.http.patch(this.url + '/products/status/', data, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }

  delete(id: any){
    return this.http.delete(this.url + '/products/' + id, {
      headers: new HttpHeaders().set('content-type', "application/json")
    })
  }
}
