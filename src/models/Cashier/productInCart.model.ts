import { Product } from "./product.model";

export interface ProductInCart {
  product: Product,
  quantity: number
}