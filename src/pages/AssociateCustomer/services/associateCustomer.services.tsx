import axios from 'axios';
import { getSession, getRecorder } from '../../../utilities/public.utilities';
import { Dni } from '../../../models/AssociateCustomer/dni.model';
import { MemberClub } from '../../../models/Cashier/memberClub.model';
import { createMemberClubAdapter } from '../../../adapters/Cashier/memberClub.adapter';
//import { MemberClub } from '../../../models/Cashier/memberClub.model';

const API_URL: string = "http://localhost:8080/api"; //HARCODE
/*
    {
      "numeroTramite": 16000,
      "apellidos": "QUIROGA YANZI",
      "nombres": "PEPE HONGUITO",
      "sexo": "M",
      "numeroDni": 38129381,
      "ejemplar": "asd",
      "nacimiento": "2022-08-23",
      "fechaEmision": "2022-08-22",
      "inicioFinCuil": 57653,
      "user": null
    },*/
const associateCustomer = async (dni: Dni) => {
  //console.log("associateCustomer.services.tsx -> associateCustomer() -> dni: " + JSON.stringify(dni));
  //console.log("associateCustomer.services.tsx -> associateCustomer() -> Recorder: " + JSON.stringify(getRecorder()));
  const data = {
    "Documento": {
      "numeroTramite": dni.numeroTramite,
      "apellidos": dni.apellidos,
      "nombres": dni.nombres,
      "sexo": dni.sexo,
      "numeroDni": dni.numeroDni,
      "ejemplar": dni.ejemplar,
      "nacimiento": dni.nacimiento,
      "fechaEmision": dni.fechaEmision,
      "inicioFinCuil": dni.inicioFinCuil,
      "user": null
    },
    "Registrador": {
      "id": getRecorder().id,
      "estado": getRecorder().estado
    }
  }

  console.log("associateCustomer.services.tsx -> associateCustomer() -> data: " + JSON.stringify(data));

  const res = await axios.post<MemberClub>(API_URL + `/documentos/create/asociado-club`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar realizar el cange. Type error -> " + error.response.status);
    return error.response.status;
  });

  console.log("associateCustomer.services.tsx -> associateCustomer() -> res: " + JSON.stringify(res.data));

  if (res.status === 200) {
    const memberClub = createMemberClubAdapter(res.data);
    return memberClub;
  } else {
    return 0;
  }

  
};

export { associateCustomer }