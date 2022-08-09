import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/globalConsts';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: any = FormGroup;
  responseMessage:any;

  constructor(private form: FormBuilder, private router: Router,
    private userService: UserService, private snackBar: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>) { }
  ngOnInit(): void {
    this.changePasswordForm = this.form.group({
      oldPassword:[null, [Validators.required]],
      newPassword:[null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }

  validateSubmitButton(){
    return (this.changePasswordForm.controls['newPassword'] != this.changePasswordForm.controls['confirmPassword'])
  }
  handleChangePassword(){
    this.ngxService.start();
    const formData = this.changePasswordForm.value;
    const backEndData = {
      oldPassword: formData.name,
      newPassword: formData.email,
      confirmPassword: formData.phoneNumber,
    }
    this.userService.changePassword(backEndData).subscribe((response: any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackBar.openSnackBar(this.responseMessage, "success");
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
