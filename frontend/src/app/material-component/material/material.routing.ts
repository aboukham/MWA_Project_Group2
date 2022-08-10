import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { GuardService } from 'src/app/services/guard.service';
import { ManageCategoryComponent } from '../manage-category/manage-category.component';
import { ManageProductComponent } from '../manage-product/manage-product.component';
import { CategoryComponent } from './dialog/category/category.component';



export const MaterialRoutes: Routes = [
    {
        path: 'category',
        component: ManageCategoryComponent,
        canActivate:[GuardService],
        data:{
            expectedRole : ['admin']
        }

    },
    {
        path: 'product',
        component: ManageProductComponent,
        canActivate:[GuardService],
        data:{
            expectedRole : ['admin']
        }

    }
];
