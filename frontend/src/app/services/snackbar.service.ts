import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private bar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    if (action === 'error') {
      this.bar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['black-snackbar']
      })
    } else {
      this.bar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['green-snackbar']

      })
    }
  }
}
