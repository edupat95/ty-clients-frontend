import React, { FC } from 'react';
import { Product } from '../../../models/Cashier/product.model';
import "../styles/ProductInMenu.css";

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductInMenu: FC<Props> = ({ product, addToCart }) => {
  return (
    <div className='principalContainer'>
      <div className='secondaryContainer'>
        <div className='firstColumn'>
          <div style={{backgroundColor: "#076E01"}}><p> {product.nombre}  </p></div>
          <p><u>{"Precio:"}</u> ${product.precio}{"(Pts:" + product.costoPuntos + ")"}</p>
        </div>
        <div className='secondColumn'>
          <p><u>{"Descripción:"}</u> {product.descripcion}</p>
          <p><u>{"Recompensa:"}</u> {product.puntosRecompensa}</p>
        </div>
      </div>
      <div style={{textAlign: "center"}}>
        <button style={{width:"50%", height: "35px" }}onClick={() => addToCart(product)}>Agregar</button>
      </div>
    </div>
  )
}

export default ProductInMenu