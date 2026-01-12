import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ProductPayload } from '../models/payload-product.interface';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  baseApi = "http://localhost:3000/products"

  http = inject(HttpClient)
  private _snackBar = inject(MatSnackBar);

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, 'X', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['ms-error'] : ['ms-success'],
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApi)
  }

  getProductById(id: string): Observable<Product> {
    const url = `${this.baseApi}/${id}`
    return this.http.get<Product>(url)
  }

  createProduct(payload: ProductPayload): Observable<Product> {
    return this.http.post<Product>(this.baseApi, payload)
  }

  editProduct(product: Product): Observable<Product> {
    const url = `${this.baseApi}/${product.id}`
    return this.http.put<Product>(url, product)
  }

  deleteProduct(product: Product): Observable<Product>{
     const url = `${this.baseApi}/${product.id}`
    return this.http.delete<Product>(url)
  }
}
