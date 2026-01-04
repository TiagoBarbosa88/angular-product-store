import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../models/products';
import { ProductServiceService } from './../../services/product-service.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  products$: Products[] = []

  constructor(private productService: ProductServiceService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe( products  => {
      this.products$ = products

      console.log(this.products$)
    })
  }

}
