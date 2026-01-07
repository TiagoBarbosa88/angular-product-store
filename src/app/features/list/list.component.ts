import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Products } from '../../models/products';
import { ProductServiceService } from './../../services/product-service.service';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink, MatAnchor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products$!: Observable<Products[]>

  productService = inject(ProductServiceService)
  router = inject(Router)

  ngOnInit(): void {
    this.products$ = this.productService.getProducts()
  }

  onEdit(productId: string | undefined): void {
    this.router.navigate(['/edit-product', productId])
  }

  // constructor(private productService: ProductServiceService) {
  //   this.products$ = this.productService.getProducts()
  // }


  // Versão com Subscribe
  // ngOnInit(): void {
  //   this.productService.getProducts().subscribe( products  => {
  //     this.products$ = products

  //     console.log(this.products$)
  //   })
  // }

}
