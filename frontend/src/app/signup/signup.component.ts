import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/globalConsts';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage:any;

  constructor(private form: FormBuilder, private router: Router,
    private userService: UserService, private snackBar: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private dialogRef: MatDialogRef<SignupComponent>) { }
  ngOnInit(): void {
    this.signupForm = this.form.group({
      name:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      phoneNumber:[null, [Validators.required, Validators.pattern(GlobalConstants.phoneNumberRegex)]],
      password:[null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }

  handleSubmit(){
    this.ngxService.start();
    const formData = this.signupForm.value;
    const backEndData = {
      name: formData.name,
      email: formData.email,
      phoneNumber : formData.phoneNumber,
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
