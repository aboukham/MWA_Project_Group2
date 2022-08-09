import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-main',
  templateUrl: 'mainComponent.html',
  styleUrls: ['./mainComponent.css']
})
export class MainComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null){
      this.userService.checkToken().subscribe((response: any)=>{
        this.router.navigate(['/halal/dashboard']);
      }, (error: any) => {
        console.log(error);
      })
    }
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
