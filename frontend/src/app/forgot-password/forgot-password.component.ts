import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/globalConsts';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any = FormGroup;
  responseMessage:any;

  constructor(private form: FormBuilder, private router: Router,
    private userService: UserService, private snackBar: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.forgotPasswordForm = this.form.group({
      email:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null, [Validators.required]],
    })
  }

  handleSubmit(){
    this.ngxService.start();
    const formData = this.forgotPasswordForm.value;
    const backEndData = {
      email: formData.email,
      password: formData.password
    }
    this.userService.signup(backEndData).subscribe((response: any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackBar.openSnackBar(this.responseMessage, "");
      this.router.navigate(['/']);
    },(error)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      if (error.error?.message)
        this.responseMessage = error.error?.message;
      else
        this.responseMessage = GlobalConstants.errorMesage;
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
    );
  }

}
