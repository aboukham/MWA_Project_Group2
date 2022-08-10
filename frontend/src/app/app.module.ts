import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './home/main.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MaterialModule } from './shared/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import {NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION} from 'ngx-ui-loader';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FullComponent } from './full/full.component';
import { ViewBillProductsComponent } from './material-component/material/dialog/view-bill-products/view-bill-products.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { TokenInterceptor } from './services/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './material-component/material/dialog/category/category.component';
import { ManageCategoryComponent } from './material-component/manage-category/manage-category.component';
import { ManageProductComponent } from './material-component/manage-product/manage-product.component';

const ngxUiLoaderConfig:NgxUiLoaderConfig = {
  text:'loading...',
  textColor:"#FFFFFF",
  textPosition:'center-center',
  pbColor: 'blue',
  bgsColor:'blue',
  fgsColor: '',
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
    AdminComponent,
    SidebarComponent,
    FullComponent,
    DashboardComponent,
    HeaderComponent,
    CategoryComponent,
    ManageCategoryComponent,
    ManageProductComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    
  ],
  providers: [HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
