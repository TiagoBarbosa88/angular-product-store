import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ProductServiceService } from './../../services/product-service.service';
import { CardComponent } from './components/card/card.component';


@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <!-- <h2 mat-dialog-title>Deletar produto</h2> -->
<mat-dialog-content>
  Deseja realmente deletar esse produto ?
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button (click)="onNot()">Não</button>
  <button mat-button (click)="onYes()" color="accent" cdkFocusInitial>Sim</button>
</mat-dialog-actions>
`,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef)

  onNot() {
    this.matDialogRef.close(false)
  }

  onYes() {
    this.matDialogRef.close(true)
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink, MatAnchor, MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products$!: Observable<Product[]>

  productService = inject(ProductServiceService)
  router = inject(Router)
  matDialog = inject(MatDialog)

  ngOnInit(): void {
    this.products$ = this.productService.getProducts()
  }

  onEdit(productId: string | undefined): void {
    this.router.navigate(['/edit-product', productId])
  }

  onDelete(product: Product) {

    this.matDialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((answer: boolean) => {
        
        if (answer === true) {
          this.productService.deleteProduct(product).subscribe({
            next: () => {
              this.productService.showMessage('Produto deletado com sucesso');
              this.products$ = this.productService.getProducts()
            },
            error: () => {
              this.productService.showMessage('Erro ao deletar produto', true);
            }
          });
        }

      })


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
