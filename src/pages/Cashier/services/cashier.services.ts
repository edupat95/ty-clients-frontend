import axios from 'axios';
import { MemberClub } from '../../../models/Cashier/memberClub.model';
import { Product } from '../../../models/Cashier/product.model';
import { Customer } from '../../../models/Cashier/customer.model';
import { createMemberClubAdapter } from '../../../adapters/Cashier/memberClub.adapter';
import { Member } from '../../../models/Cashier/member.model';
import { createMemberAdapter } from '../../../adapters/Cashier/member.adapter';
import { createCustomerAdapter } from '../../../adapters/Cashier/customer.adapter';
import { getSession } from '../../../utilities/public.utilities';


const API_URL: string = "http://localhost:8080/api";

const getProducts = async () => {
  //console.log("Cargando productos para user--> " + getSession().id_token );
  const res = await axios.get<Array<Product>>(API_URL + `/productos/activos`, { //Hardcode
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
  //console.log(res.data);

  return res.data;
};


const getCustomer = async (identificador: string) => {
  // TOKEN DE SESION DE USUARIO.
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

  const res2 = await axios.get<Member>(`http://localhost:8080/api/asociados/${res.data.idAsociado.id}`, { //Hardcode buscamos al asociado
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

  
  switch(res2.code){
    case "ERR_NETWORK":
      return 0;
    case "ERR_BAD_REQUEST":
      return 401;
    default:
      break;
  }
  
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

const buyCart = async (idComprador: number, puntosRecompensa: number) => {
  
  const data = { 
    "id": idComprador,
    "puntosClub": puntosRecompensa
  }
  //console.log("La data de buy es:", data);
  const res = await axios.patch(`http://localhost:8080/api/asociado-clubs/venta/${idComprador}/`, data, { //hardcode
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
  
  if(res === 200){
    return true;
  } else {
    return false;
  }
}

const changeCart = async (idComprador: number, costoPuntos: number) => {
  const data = { 
    "id": idComprador,
    "puntosClub": costoPuntos
  }
  console.log("La data de buy es:", data);
  
  const res = await axios.patch(`http://localhost:8080/api/asociado-clubs/canje/${idComprador}/`, data, { //hardcode
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

  if(res === 200){
    return true;
  } else {
    return false;
  }
}

export { getProducts , getCustomer, buyCart, changeCart }


