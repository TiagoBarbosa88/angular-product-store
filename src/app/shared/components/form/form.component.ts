import {
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../../models/product';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  product = input<Product | null>(null);
  route = inject(Router)

  // ✅ O FORM PRECISA NASCER PRONTO
  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  @Output() formSubmit = new EventEmitter<Product>();

  constructor() {
    effect(() => {
      const product = this.product();

      // ✅ Proteção extra
      if (product) {
        this.form.patchValue({
          title: product.title
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.formSubmit.emit(this.form.value as Product);
  }

  onCancel(): void {
    this.route.navigate(['/'])
  }

}
