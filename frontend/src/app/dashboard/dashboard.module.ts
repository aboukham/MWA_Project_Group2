import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardRoutes)
  ]
})
export class DashboardModule { }
