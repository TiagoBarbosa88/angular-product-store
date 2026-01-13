import { inject } from "@angular/core"
import { ProductServiceService } from "../../services/product-service.service"

export const getProducts = () => {
  const productService = inject(ProductServiceService)
  return productService.getProducts()
}
