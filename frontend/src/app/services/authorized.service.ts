import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedService {

  constructor(private router : Router) { }

  isAuthenticated(): boolean{
    return (localStorage.getItem('token') != null);
  }
}
