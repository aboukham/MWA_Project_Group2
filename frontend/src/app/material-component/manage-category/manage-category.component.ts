import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/globalConsts';
import { SignupComponent } from 'src/app/signup/signup.component';
import { CategoryComponent } from '../material/dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns:string[] = ['name', 'edit'];
  data:any;
  responseMessage: any;
  

  constructor(private form: FormBuilder, private router: Router,
    private catService: CategoryService, private snackBar: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.catService.getCategories().subscribe((response: any)=>{
      this.ngxService.stop();
      console.log("my data" + response.json)
      this.data = new MatTableDataSource(response);
      console.log("my data" + response.name)
    },(error)=>{
      this.ngxService.stop();
      if (error.error?.message)
        this.responseMessage = error.error?.message;
      else
        this.responseMessage = GlobalConstants.errorMesage;
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
    );
  }

  filter(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.data.filter = value.trim().toLocaleLowerCase();
  }
  addCategory(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    dialogRef.componentInstance.onAddCategory.subscribe(
      (res) =>{
        this.tableData();
      }
    )
  }

  handleEdit(element: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: element
    }
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    dialogRef.componentInstance.onEditCategory.subscribe(
      (res) =>{
        this.tableData();
      }
    )
  }

}
