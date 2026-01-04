import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from './../models/products';
import { ProductPayload } from '../models/payload-product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  baseApi = "http://localhost:3000/products"

  http = inject(HttpClient)
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;

   showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['ms-error'] : ['ms-success'],
    });
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseApi)
  }

  createProduct(payload: ProductPayload): Observable<Products>{
    return this.http.post<Products>(this.baseApi, payload)
  }
}
