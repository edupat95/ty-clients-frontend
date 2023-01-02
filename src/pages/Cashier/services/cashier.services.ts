import axios from 'axios';
import { MemberClub } from '../../../models/Cashier/memberClub.model';
import { Product } from '../../../models/Cashier/product.model';
import { Customer } from '../../../models/Cashier/customer.model';
import { createMemberClubAdapter } from '../../../adapters/Cashier/memberClub.adapter';
import { Member } from '../../../models/Cashier/member.model';
import { createMemberAdapter } from '../../../adapters/Cashier/member.adapter';
import { createCustomerAdapter } from '../../../adapters/Cashier/customer.adapter';
import { getCashier, getSession } from '../../../utilities/public.utilities';
import { ProductInCart } from '../../../models/Cashier/productInCart.model';


const API_URL: string = "http://localhost:8080/api"; //HARCODE

const getProducts = async () => {
  const res = await axios.get<Array<Product>>(API_URL + `/productos/activos`, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al pedir el menu de products. Type error -> " + error.response.status);
    return error.response.status;
  });

  return res.data;
};


const getCustomer = async (identificador: string) => {
  // TOKEN DE SESION DE USUARIO.
  console.log("Entra a getCustomer");
  const res = await axios.get<MemberClub>(`http://localhost:8080/api/asociado-clubs/club/${getSession().club.id}/ident/${identificador}`, { //Hardcode buscamos al asociado-club
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al pedir los datos de MemberClub. Type error -> " + error);
    return error;
  });

  switch(res.code){
    case "ERR_NETWORK":
      return 0;
    case "ERR_BAD_REQUEST":
      return 401;
    default:
      break;
  }

  //console.log("DATOS DE RES: ", res.data);
  
  const res2 = await axios.get<Member>(API_URL + `/asociados/${res.data.idAsociado.id}`, { //Hardcode buscamos al asociado
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al pedir los datos de Member. Type error -> " + error);
    return error;
  });

  //console.log("DATOS DE RES2: ", res2.data);
  
  switch(res2.code){
    case "ERR_NETWORK":
      return 0;
    case "ERR_BAD_REQUEST":
      return 401;
    default:
      break;
  }

  console.log(res);
  console.log(res2);

  if ((res.status === 200 && res2.status === 200)) {
    const memberClub = createMemberClubAdapter(res.data);
    //console.log("memberClub: " + JSON.stringify(memberClub));
    const member = createMemberAdapter(res2.data)
    //console.log("member: " + JSON.stringify(member))
    const customer: Customer = {
      memberClub: memberClub,
      member: member
    }
   
    return createCustomerAdapter(customer);
  }
}

const buyCart = async (idComprador: number, cart: Array<ProductInCart>) => {
  let productos = [{}];
  productos.pop();
  
  cart.forEach((product) => {
    productos.push({
      "id": product.product.id,
      "cantidad": product.quantity
    });
  });
  const data = { 
    "Venta": {
      "costoTotal": 0,
      "costoTotalPuntos": 0,
      "idCajero": {"id": getCashier().id},
      "idAsociado": {"id": idComprador}
    },
    "Productos": productos
  }

  const res = await axios.post(API_URL + `/ventas/create`, data, { //hardcode
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response.status;
  }).catch(function (error) {
    console.error("Error al intentar realizar la compra. Type error -> " + error.response.status);
    return error.response.status;
  });

  console.log("OBJETO ENVIADO AL REALZIAR LA COMPRA -------------->" + JSON.stringify(data));
  
  if(res === 200){
    return true;
  } else {
    return false;
  }
}

const changeCart = async (idComprador: number, cart: Array<ProductInCart>) => {
  let productos = [{}];
  productos.pop();
  
  cart.forEach((product) => {
    productos.push({
      "id": product.product.id,
      "cantidad": product.quantity
    });
  });
  const data = { 
    "Venta": {
      "costoTotal": 0,
      "costoTotalPuntos": 0,
      "idCajero": {"id": getCashier().id},
      "idAsociado": {"id": idComprador}
    },
    "Productos": productos
  }

  const res = await axios.post(API_URL + `/ventas/create/cange`, data, { //hardcode
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response.status;
  }).catch(function (error) {
    console.error("Error al intentar realizar el cange. Type error -> " + error.response.status);
    return error.response.status;
  });

  //console.log("OBJETO ENVIADO AL REALZIAR EL CANGE -------------->" + JSON.stringify(data));
  
  if(res === 200){
    return true;
  } else {
    return false;
  }
}

export { getProducts , getCustomer, buyCart, changeCart }


