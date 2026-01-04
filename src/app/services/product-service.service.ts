import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from './../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  baseApi = "http://localhost:3000/products"

  http = inject(HttpClient)
  constructor() { }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseApi)
  }
}
