import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/globalConsts';
import { CategoryComponent } from '../material/dialog/category/category.component';
import { ProductComponent } from '../material/dialog/product/product.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  displayedColumns:string[] = ['name', 'categoryName', 'description','price','edit'];
  data:any;
  responseMessage: any;
  

  constructor(private form: FormBuilder, private router: Router,
    private prodService: ProductService, private snackBar: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.prodService.getProducts().subscribe((response: any)=>{
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

  applyfilter(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.data.filter = value.trim().toLocaleLowerCase();
  }
  addProduct(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    dialogRef.componentInstance.onAddProduct.subscribe(
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
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    dialogRef.componentInstance.onEditProduct.subscribe(
      (res) =>{
        this.tableData();
      }
    )
  }

  handleDelete(element: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Delete',
      data: element
    }
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    dialogRef.componentInstance.onDeleteProduct.subscribe(
      (res) =>{
        this.tableData();
      }
    )
  }

  onChange(status: any, id: any){

  }


}
