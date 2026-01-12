import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductServiceService } from '../../services/product-service.service';
import { FormComponent } from '../../shared/components/form/form.component';


@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  productService = inject(ProductServiceService)
  router = inject(Router)

  onSubmit(product: Product) {

    const title = product.title

    if (!title) {
      this.productService.showMessage('Título é obrigatório', true);
      return
    }

    this.productService.createProduct({ title }).subscribe({
      next: () => {
        this.productService.showMessage("Produto criado com sucesso", false);
        setTimeout(() => {
          this.router.navigate(['']);
        }, 500);
      },
      error: (error) => {
        this.productService.showMessage("Erro ao criar produto", true);
      }
    })

  }
}
