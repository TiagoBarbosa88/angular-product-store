import { CommonModule } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { ProductServiceService } from './../../services/product-service.service';
import { CardComponent } from './components/card/card.component';
import { NoItensComponent } from './components/no-itens/no-itens.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink, MatAnchor, MatDialogModule, NoItensComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products$ = signal<Product[]>(
    inject(ActivatedRoute).snapshot.data['products']
  )

  productService = inject(ProductServiceService)
  router = inject(Router)
  confirmationDialogService = inject(ConfirmationDialogService)

  onEdit(productId: string | undefined): void {
    this.router.navigate(['/edit-product', productId])
  }

  onDelete(product: Product) {
    this.confirmationDialogService.openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.productService.deleteProduct(product).subscribe(() => {
          this.productService.showMessage('Produto deletado com sucesso');
          this.productService.getProducts().subscribe((products) => {
            this.products$.set(products)
          })
        })
      })
  }
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
