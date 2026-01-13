import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { getProducts } from './shared/resolvers/get-products.resolver';

export const routes: Routes = [
  {
    path: '',
    resolve: {
      products: getProducts
    },
    component: ListComponent
  },
  {
    path: 'create-product',
    loadComponent: () => import('./features/create-product/create-product.component').then(m => m.CreateProductComponent)
  },
  {
    path: 'edit-product/:id',
    loadComponent: () => import('./features/edit-product/edit-product.component').then(m => m.EditProductComponent)
  }
];
