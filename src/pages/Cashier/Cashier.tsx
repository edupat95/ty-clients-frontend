import React, { useEffect, useState, useReducer } from 'react';
import { getProducts, getCustomer, buyCart, changeCart } from './services/cashier.services';
import "./styles/Cashier.css";
import { Product } from "../../models/Cashier/product.model"
import { cashierReducer, cashierInitialState } from "../Cashier/reducer/cashier.reducer";
import { createProductAdapter } from '../../adapters/Cashier/product.adapter';
import ProductInMenu from './components/ProductInMenu';
import ProductInCartComponent from './components/ProductInCartComponent';
import { calculateTotalPoints, calculateTotalReward, calculateTotalPrice } from './utilities/cashier.utilities';
import Scann from './components/Scann';
import { Customer } from '../../models/Cashier/customer.model';
import { Navigate } from 'react-router-dom';
import { getSession } from '../../utilities/public.utilities';

export const Cashier = () => {
  const [cashierState, dispatch] = useReducer(cashierReducer, cashierInitialState);
  const { products, cart } = cashierState;
  const [scanState, setScanState] = useState(false);
  const [errorSerch, setErrorSerch] = useState('');
  const [customer, setCustomer] = useState<Customer>();
  const [logout,setLogout] = useState(false);

  useEffect(() => {
    const interval=setInterval(()=>{      
      setErrorSerch('');
    },5000)

    return() => {
      clearInterval(interval)
    }
  }, []);

  const handleShowProductMenu = async () => {
    const res = await getProducts();
    //Cambiamos el tipo de res a un Array<Product>
    let aux_arr: Array<Product> = [];
    for (let producto in res) {
      //console.log("DENTRO DEL FOR->" + createProductAdapter(res[producto]).nombre);
      aux_arr.push(createProductAdapter(res[producto]));
    }
    //Finalizamos cabmio de tipo

    dispatch({ type: "LIST_PRODUCT_MENU", payload: aux_arr });
  }

  const serchCustomer = async (identifier: string) => {
    const cu = await getCustomer(identifier);
    if(cu === 0){
      setErrorSerch("Cliente no encontrado"); 
      setCustomer(undefined);
    }else if(cu === 401) {
      setErrorSerch("cliente no encontrado"); 
      setCustomer(undefined);
    } else {
      setCustomer(cu)
    }
    
  };

  const handleLogout = () => {
    setLogout(true)
  }

  const handleBuyCart = async () => {
    if(customer){
      if(await buyCart( customer.memberClub.id  , calculateTotalReward(cart) )){
        alert("Venta exitosa +"+calculateTotalReward(cart)+"pts");
        dispatch({type: "CLEAR_CART"});
        setCustomer(undefined);
      } else {
        alert("ERROR: NO SE PUEDE REALIZAR LA VENTA");
      }  
    } else {
      alert("VENTA EXITOSA A CLIENTE NO ASOCIADO");
      dispatch({type: "CLEAR_CART"});
      setCustomer(undefined);
    }
  }

  const handleChangeCart = async () => {

    if((customer ? customer.memberClub.puntosClub : -1) >= calculateTotalPoints(cart) ){
      if(await changeCart((customer ? customer.memberClub.id : 0) , calculateTotalPoints(cart) )){
        alert("Canje exitoso, -"+ calculateTotalReward(cart) +"pts");
        dispatch({type: "CLEAR_CART"});
        setCustomer(undefined);
      } else {
        alert("ERROR: NO SE PUEDE REALIZAR EL CANGE");
      }
    } else {
      alert("ERROR: EL CLIENTE NO POSEE LOS SUFICIENTES PUNTOS")
    }
      
  }
    

  return (
    <>
      {logout && (
            <Navigate to="/" replace={true} />
          )
        }
      <div style={{display: "flex"}}>
        <div >
          <p> { "Cajero: "+ (getSession().firstName ? getSession().firstName : setLogout(true))  } </p>
        </div>
        <div style={{paddingLeft: "50px"}}>
          <p> {"Empresa: " + (getSession().club.nombre ? getSession().club.nombre : setLogout(true))} </p>
        </div>
        <div style={{paddingLeft: "70%"}}>
          <button onClick={() => handleLogout()}> SALIR </button>
        </div>
      </div>
      <div className='cashierContainer'>
        <div className='cashierContainerLeft'>
          <div style={{ textAlign: 'center' }}>
            <button style={{width:"30%", height: "30px"}} onClick={() => handleShowProductMenu()}>Mostrar carta</button>
          </div>
          <div className='containterProductMenu'>
            {products.map((product) => (
              <ProductInMenu key={product.id} product={product} addToCart={(product: Product) => { dispatch({ type: "ADD_TO_CART", payload: product }); }} />
            ))}
          </div>
        </div>
        <div className='cashierContainerRight'>
          Productos a comprar
          <div className='cartProductsContainer'>
            {cart.map((productInCart) => (
              <ProductInCartComponent key={productInCart.product.id}
                productInCart={productInCart}
                addOneToCart={(product: Product) => { dispatch({ type: "ADD_ONE_TO_CART", payload: product }) }}
                removeOneFromCart={(product: Product) => { dispatch({ type: "REMOVE_ONE_FROM_CART", payload: product }) }}
                removeAllFromCart={(product: Product) => { dispatch({ type: "REMOVE_ALL_FROM_CART", payload: product }) }}
              />
            ))}
          </div>
          <div style={{flex: "1", display: "flex", paddingTop: "20px",paddingLeft: "50px"}}>
            <div style={{paddingLeft: "10%"}}>
              Total: <mark> ${calculateTotalPrice(cart)}</mark>
              <br/>
              <button onClick={() => handleBuyCart() } disabled={ (cart.length > 0) ?  false : true }> Pagar </button>
              <br/> 
              Recompensa:  {calculateTotalReward(cart)} 
            </div>
            <div style={{paddingLeft: "100px"}}>
              Limpiar el carro
              <br/>
              <button onClick={() => dispatch({type: "CLEAR_CART"})}> Quitar productos </button>
            </div>
            <div style={{paddingLeft: "150px"}}> 
              Total(pts): {calculateTotalPoints(cart)} 
              <br/>
              <button onClick={() => handleChangeCart()} disabled={((calculateTotalPoints(cart) > (customer ? customer.memberClub.puntosClub : -1)) || (cart.length === 0))? true : false }> Canjear </button>
            </div> 
          </div>    
          <div style={{paddingTop: "30px"}}>
            <p>Puntos del cliente: {customer?.memberClub.puntosClub} </p><br />
            <p>{customer ? "" : "IDENTIFIQUE AL CLIENTE"}</p>
          </div>
          <div className='scannContainer'>
            <button onClick={() => setScanState(true)}>SCAN</button>
            <button onClick={() => setScanState(false)}>CLOSE</button>
            <button onClick={() => setCustomer(undefined)}>QUITAR CLIENTE</button>
            {scanState && (<Scann serchCustomer={serchCustomer} />)}   
          </div>
          <div>
            <div style={{color: "red"}}>
              <p>{errorSerch}</p>
            </div>
            Nombre: {customer ? customer.member.idDocumento.nombres + " " + customer.member.idDocumento.apellidos : ""} <br />
            DNI: {customer?.member.idDocumento.numeroDni}<br />
          
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Cashier