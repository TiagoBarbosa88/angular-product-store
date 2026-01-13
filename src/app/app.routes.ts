import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { ProductServiceService } from '../app/services/product-service.service'
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: '',
    resolve: {
      products: () => {
        const productService = inject(ProductServiceService)
        return productService.getProducts()
      }
    },
    component: ListComponent },
  {
    path: 'create-product',
    loadComponent: () => import('./features/create-product/create-product.component').then(m => m.CreateProductComponent)
  },
  {
    path: 'edit-product/:id',
    loadComponent: () => import('./features/edit-product/edit-product.component').then(m => m.EditProductComponent)
  }
];
