import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-main',
  templateUrl: 'mainComponent.html',
  styleUrls: ['./mainComponent.css']
})
export class MainComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  signup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height ='600px'
    this.dialog.open(SignupComponent, dialogConfig);
  }

  login(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    this.dialog.open(LoginComponent, dialogConfig);
  }



}
