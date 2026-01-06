import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ProductPayload } from '../models/payload-product.interface';
import { Products } from './../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  baseApi = "http://localhost:3000/products"

  http = inject(HttpClient)
  private _snackBar = inject(MatSnackBar);

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['ms-error'] : ['ms-success'],
    });
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseApi)
  }

  getProductById(id: string): Observable<Products>{
    const url = `${this.baseApi}/${id}`
    return this.http.get<Products>(url)
  }

  createProduct(payload: ProductPayload): Observable<Products> {
    return this.http.post<Products>(this.baseApi, payload)
  }
}
