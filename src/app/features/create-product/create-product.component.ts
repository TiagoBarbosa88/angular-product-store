import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    })
  })

  onSubmit() {

    this.productService.createProduct({
      title: this.form.controls.title.value
    }).subscribe({
      next: () => {
        this.productService.showMessage("Produto criado com sucesso", false);
        this.form.reset();
      },
      error: (error) => {
        this.productService.showMessage("Erro ao criar produto", true);
      }
    })
  }
}
