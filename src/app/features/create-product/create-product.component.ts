import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';


@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  productService = inject(ProductServiceService)
  router = inject(Router)


  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required, 
    })
  })

  onSubmit() {

    const title = this.form.controls.title.value?.trim()

    if(!title){
      this.productService.showMessage('Título é obrigatório', true);
      return
    }

    this.productService.createProduct({ title }).subscribe({
      next: () => {
          this.productService.showMessage("Produto criado com sucesso", false);
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(['']);
          }, 1000);
      },
      error: (error) => {
        this.productService.showMessage("Erro ao criar produto", true);
      }
    })

  }
}
