import { DialogConfig } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../material-component/material/dialog/change-password/change-password.component';
import { ConfirmationComponent } from '../material-component/material/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  role: any;
  constructor(private router: Router,
    private dialog: MatDialog) {

  }
  ngOnInit(): void {
  }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'logout'
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig)
    const ref = dialogRef.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/'])
    })
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(ChangePasswordComponent, dialogConfig);
  }
}
