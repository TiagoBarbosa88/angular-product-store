import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../models/products';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {

  product$!: Products;

  productService = inject(ProductServiceService)
  router = inject(Router)
  route = inject(ActivatedRoute)


  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id).subscribe((product) => {
      this.product$ = product;
      this.form.patchValue({ title: product.title });
    })
  }


  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    })
  })


  onSubmit() {

    const title = this.form.controls.title.value?.trim()

    if (!title) {
      this.productService.showMessage('Título é obrigatório', true);
      return
    }

    this.productService.editProduct({ ...this.product$, title }).subscribe({
      next: () => {
        this.productService.showMessage("Produto atualizado com sucesso", false);
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1000);
      },
      error: (error) => {
        this.productService.showMessage("Erro ao atualizar produto", true);
      }
    })

  }

}
