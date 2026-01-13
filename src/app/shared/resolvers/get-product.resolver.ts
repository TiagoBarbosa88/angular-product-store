import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { ProductServiceService } from "../../services/product-service.service";

export const getProduct = (route: ActivatedRouteSnapshot) => {
  const productServices = inject(ProductServiceService)
  return productServices.getProductById(route.paramMap.get('id') as string)
}
