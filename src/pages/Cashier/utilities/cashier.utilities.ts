import { ProductInCart } from "../../../models/Cashier/productInCart.model";
const calculateTotalPrice = (cart: Array<ProductInCart>) => {
  let total: number = 0;
  cart.map((item) => total = total + (item.product.precio * item.quantity));
  return total;
};

const calculateTotalPoints = (cart: Array<ProductInCart>) => {
  let total: number = 0;
  cart.map((item) => total = total + (item.product.costoPuntos * item.quantity));
  return total;
};

const calculateTotalReward = (cart: Array<ProductInCart>) => {
  let total: number = 0;
  cart.map((item) => total = total + (item.product.puntosRecompensa * item.quantity));
  return total;
};

export {calculateTotalPrice, calculateTotalReward, calculateTotalPoints}