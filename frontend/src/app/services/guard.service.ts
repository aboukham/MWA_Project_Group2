import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthorizedService } from './authorized.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode'
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { GlobalConstants } from '../shared/globalConsts';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(public auth: AuthorizedService,
    public router: Router,
    public snackBar: SnackbarService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = route.data['expectedRole'];

    const token: any = localStorage.getItem('token');
    let tokenPayLoad: any;
    try {
      tokenPayLoad = jwt_decode(token);
    } catch {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole = false;
    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == tokenPayLoad.role) {
        checkRole = true;
      }
    }
    if (tokenPayLoad.role == 'user' || tokenPayLoad.role == 'admin') {
      if (this.auth.isAuthenticated() && checkRole) {
        return true;
      }
      this.snackBar.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error)
      this.router.navigate(['/halal/dashboard']);
      return false;
    } else {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }
  }

}


