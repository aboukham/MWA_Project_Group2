import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginComponent } from '../login/login.component';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/globalConsts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  responseMessage: any;
  data: any;
  
  constructor(private form: FormBuilder, private router: Router,
    private dashBoardService: DashboardService, private snackBar: SnackbarService,
    private ngxService: NgxUiLoaderService,
   ) {
      this.ngxService.start();
      this.dashBoardData();
     }

  ngAfterViewInit(): void {}

  dashBoardData(){
    console.log("I'm inside dash")
    this.dashBoardService.getDetails().subscribe((response: any) => {
      console.log("I'm inside dash cc" + response.category)
      this.ngxService.stop();
      this.data = response;
    }, (error)=> {
      this.ngxService.stop();
      if (error.error?.message) this.responseMessage = error.error?.message;
      else  this.responseMessage = GlobalConstants.errorMesage;
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }

}
