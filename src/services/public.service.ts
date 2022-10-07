import { User } from '../models/user.model';
import axios from 'axios';
import { createWorkerAdapter } from '../adapters/worker.adapter';
import { Worker } from '../models/worker.model';
import { createClubAdapter } from '../adapters/club.adapter';
import { responsiveFontSizes } from '@mui/material';

const API_URL: string = "http://localhost:8080/api";

const login = async (username:string, password:string) => {
  //console.log("Lo que llega a services/login " + username + " - " + password);
  
  var data = JSON.stringify({
    "username": username,
    "password": password
  });

  let response = await axios.post(API_URL +'/authenticate', data , { headers: {'Content-Type': 'application/json'} })
  .then(function (response) {
    //console.log("service/response->" + JSON.stringify(response.status));
    return response;
  })
  .catch(function (error) {
    //console.log("Error al obtener el token. Type error -> " + error);
    return error;
  });

  //console.log("DATOS OBJTENIDOS EN RESPONSE -> " + JSON.stringify(response.code));
  switch(response.code){
    case "ERR_NETWORK":
      return 0;
    case "ERR_BAD_REQUEST":
      return 401;
    default:
      break;
  }

  let response2 = await axios.get(API_URL + '/account', { headers: {'Authorization': 'Bearer ' + response.data.id_token}})
  .then(function (response) {
    //console.log("service->" + JSON.stringify(response));
    return response;
  })
  .catch(function (error) {
    console.error("Error al obtener datos del usuario. Type error -> " + error.response.status);
    return error.response.status;
  });


  switch(response2.code){
    case "ERR_NETWORK":
      return 0;
    case "ERR_BAD_REQUEST":
      return 401;
    default:
      break;
  }

  //console.log("DATOS OBJTENIDOS EN RESPONSE2 -> " + JSON.stringify(response2.data));
  let usuario: User;
   
  
  if((response.status === 200 && response2.status === 200)){
    const worker = await getWorkerByUser(response.data.id_token, response2.data.id); 
    //console.log("DATOS DEL CLUB ->" + createClubAdapter(worker.club).nombre);
    const club = createClubAdapter(worker.club);
    usuario = {
      id_token: response.data.id_token,
      id: response2.data.id,
      login: response2.data.login,
      firstName: response2.data.firstName,
      lastName: response2.data.lastName,
      email: response2.data.email,
      imageUrl: response2.data.imageUrl,
      activated: response2.data.activated,
      langKey: response2.data.langKey,
      club: club
    };

    
    

    return usuario;
  }

};

const getWorkerByUser = async (token: string, user_id: number) => {
  //console.log("USER ID BUSCADO: " + user_id)
  let response = await axios.get(API_URL + '/trabajadors/user/'+user_id, { headers: {'Authorization': 'Bearer ' + token}})
  .then(function (response) {
    //console.log("service->" + JSON.stringify(response));
    return response;
  })
  .catch(function (error) {
    console.error("Error al obtener datos del trabajador. Type error -> " + error.response.status);
    return error.response.status;
  });


  const worker: Worker = createWorkerAdapter(response.data);

  //console.log("Trabajador recuperador:", JSON.stringify(response.data));

  return worker;
}
export {login}
