import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import{CategoryService} from 'src/app/services/category.service';
import { GlobalConstants } from 'src/app/shared/globalConsts';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction:any = 'Add';
  action: any = 'Add';
  responseMessage: any;

  constructor(@Inject (MAT_DIALOG_DATA) public dialogData:any, private form: FormBuilder, private router: Router,
    private categoryService: CategoryService, private snackBar: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private dialogRef: MatDialogRef<CategoryComponent>) { }

  ngOnInit(): void {
    this.categoryForm = this.form.group({
      name:[null, [Validators.required]]
    })
    if (this.dialogData.action === 'Edit'){
      this.dialogAction === 'Edit'
      this.action = 'update';
      this.categoryForm.patchValue(this.dialogData.data)
    }
  }

  handleSubmit(){
    (this.dialogAction === 'Edit')? this.edit() : this.add();
  }
  add(){
    let formData = this.categoryForm.value
    let backEndData = {
      name: formData.name
    }

    this.categoryService.add(backEndData).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onAddCategory.emit();
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
    let formData = this.categoryForm.value
    let backEndData = {
      id: this.dialogData.data.id,
      name: formData.name
    }

    this.categoryService.update(backEndData).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onEditCategory.emit();
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
