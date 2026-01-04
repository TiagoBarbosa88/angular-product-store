import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../models/products';
import { ProductServiceService } from './../../services/product-service.service';
import { CardComponent } from './components/card/card.component';
import { RouterLink } from '@angular/router';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink, MatAnchor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products$!: Observable<Products[]>

  constructor(private productService: ProductServiceService) {
    this.products$ = this.productService.getProducts()
  }


  // Versão com Subscribe
  // ngOnInit(): void {
  //   this.productService.getProducts().subscribe( products  => {
  //     this.products$ = products

  //     console.log(this.products$)
  //   })
  // }

}
