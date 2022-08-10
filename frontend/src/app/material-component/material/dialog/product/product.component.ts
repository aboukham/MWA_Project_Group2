import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/globalConsts';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  onDeleteProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction:any = 'Add';
  action: any = 'Add';
  responseMessage: any;

  constructor(@Inject (MAT_DIALOG_DATA) public dialogData:any, private form: FormBuilder, private router: Router,
    private productService: ProductService, private snackBar: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private dialogRef: MatDialogRef<ProductComponent>) { }

  ngOnInit(): void {
    this.productForm = this.form.group({
      name:[null, [Validators.required]],
      categoryName:[null, [Validators.required]],
      description:[null, [Validators.required]],
      price:[null, [Validators.required]],
      isHalal:[null, [Validators.required]]
    })
    if (this.dialogData.action === 'Edit'){
      this.dialogAction === 'Edit'
      this.action = 'update';
      this.productForm.patchValue(this.dialogData.data)
    }else if (this.dialogData.action === 'Delete'){
      this.dialogAction === 'Delete'
      this.action = 'delete';
      this.productForm.patchValue(this.dialogData.data)
    }
  }

  handleSubmit(){
    (this.dialogAction === 'Edit')? this.edit() : ((this.dialogAction === 'Add')?this.add() : this.delete());
  }
  add(){
    let formData = this.productForm.value
    let backEndData = {
      name: formData.name,
      categoryName: formData.categoryName,
      description : formData.description,
      price: formData.price,
      isHalal: formData.isHalal
    }

    this.productService.add(backEndData).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onAddProduct.emit();
      this.responseMessage = response.message;
      this.snackBar.openSnackBar(this.responseMessage, 'success');
    },(error)=>{
      this.dialogRef.close();
      if (error.error?.message)
        this.responseMessage = error.error?.message;
      else
        this.responseMessage = GlobalConstants.errorMesage;
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
    );
  }
  edit(){
    let formData = this.productForm.value
    let backEndData = {
      id: this.dialogData.data.id,
      name: formData.name,
      categoryName: formData.categoryName,
      description : formData.description,
      price: formData.price,
      isHalal: formData.isHalal
    }

    this.productService.update(backEndData).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onEditProduct.emit();
      this.responseMessage = response.message;
      this.snackBar.openSnackBar(this.responseMessage, 'success');
    },(error)=>{
      this.dialogRef.close();
      if (error.error?.message)
        this.responseMessage = error.error?.message;
      else
        this.responseMessage = GlobalConstants.errorMesage;
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
    );
  }

  delete(){
    this.productService.delete(this.dialogData.data.id).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onEditProduct.emit();
      this.responseMessage = response.message;
      this.snackBar.openSnackBar(this.responseMessage, 'success');
    },(error)=>{
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
