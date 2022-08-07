import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './home/main.component';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './shared/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import {NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION} from 'ngx-ui-loader';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'

const ngxUiLoaderConfig:NgxUiLoaderConfig = {
  text:'loading...',
  textColor:"#FFFFFF",
  textPosition:'center-center',
  pbColor: 'red',
  bgsColor:'red',
  fgsColor: 'red',
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize:100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
}
@NgModule({
  declarations: [
    MainComponent,
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
