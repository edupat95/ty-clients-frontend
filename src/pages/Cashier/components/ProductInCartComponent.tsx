import React, { FC } from 'react';
import { ProductInCart } from '../../../models/Cashier/productInCart.model';
import "../styles/ProductInMenu.css";
import { Product } from '../../../models/Cashier/product.model';

interface Props {
  productInCart: ProductInCart;
  addOneToCart: (product: Product) => void;
  removeOneFromCart: (product: Product) => void;
  removeAllFromCart: (product: Product) => void;
}

const ProductInCartComponent: FC<Props> = ({ productInCart, addOneToCart , removeOneFromCart , removeAllFromCart}) => {
  return (
    <div style={{borderBottom: "thin solid gray", paddingLeft: 10}}>
      <h5>{productInCart.product.nombre} X{productInCart.quantity} {"|| Precio: "} ${productInCart.product.precio*productInCart.quantity}{"(Pts:"+ productInCart.product.costoPuntos*productInCart.quantity +")"} {"|| Recompensa: "} {productInCart.product.puntosRecompensa*productInCart.quantity}pts <button onClick={() => {addOneToCart(productInCart.product)}}> + </button> <button onClick={() => {removeOneFromCart(productInCart.product)}}> - </button> <button onClick={() => {removeAllFromCart(productInCart.product)}}> Quitar todos </button></h5>
    </div>
  )
}

export default ProductInCartComponent