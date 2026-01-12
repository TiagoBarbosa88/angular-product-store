import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductServiceService } from '../../services/product-service.service';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  product$!: Product;

  productService = inject(ProductServiceService)
  router = inject(Router)
  route = inject(ActivatedRoute)


  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.productService.getProductById(id).subscribe(product => {
      this.product$ = product;
    });

  }


  // onSubmit(product: Products) {

  //   const title = this.product$.title

  //   if (!title) {
  //     this.productService.showMessage('Título é obrigatório', true);
  //     return
  //   }

  //   this.productService.editProduct({ ...this.product$, title }).subscribe({
  //     next: () => {
  //       this.productService.showMessage("Produto atualizado com sucesso", false);
  //       setTimeout(() => {
  //         this.router.navigate(['']);
  //       }, 1000);
  //     },
  //     error: (error) => {
  //       this.productService.showMessage("Erro ao atualizar produto", true);
  //     }
  //   })

  // }

  onSubmit(product: Product) {
    if (!product.title) {
      this.productService.showMessage('Título é obrigatório', true);
      return;
    }

    this.productService.editProduct({
      ...this.product$,
      title: product.title
    }).subscribe({
      next: () => {
        this.productService.showMessage('Produto atualizado com sucesso', false);
        this.router.navigate(['']);
      },
      error: () => {
        this.productService.showMessage('Erro ao atualizar produto', true);
      }
    });
  }

}
