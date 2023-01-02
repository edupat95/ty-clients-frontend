import React, { useState, useEffect } from 'react';
import { getRecorder, getSession } from '../../utilities/public.utilities';
import { useNavigate } from 'react-router-dom';
import { Button, Input, InputAdornment, TextField } from '@mui/material';
import { Dni } from '../../models/AssociateCustomer/dni.model';
//import { MemberClub } from '../../models/Cashier/memberClub.model';
import { associateCustomer } from './services/associateCustomer.services';
import { QRCodeCanvas } from 'qrcode.react';
import "./styles/AssociateCustomer.css";
import { MemberClub } from '../../models/Cashier/memberClub.model';
import CabeceraComponent from '../../components/CabeceraComponent';

//numero-tramite@apellidos@nombres@sexo@numero-dni@ejemplar@nacimiento@fecha de emision@inicio-fin-cuil
/*ESTRUCTURA DEL OBJETO
{
  "id": 1,
  "numeroTramite": 16574,
  "apellidos": "driver",
  "nombres": "Asistente connect hacking",
  "sexo": "invoice evolve",
  "numeroDni": 79568,
  "ejemplar": "granular Blanco Optimizado",
  "nacimiento": "2022-08-23",
  "fechaEmision": "2022-08-22",
  "inicioFinCuil": 57653,
  "user": null
},
*/
export const AssociateCustomer = () => {
  const [newMember, setNewMember] = useState<MemberClub>({} as MemberClub);
  const [dni, setDni] = useState<Dni>(
    {
      id: 0,
      numeroTramite: 0,
      apellidos: "",
      nombres: "",
      sexo: "",
      numeroDni: 0,
      ejemplar: "",
      nacimiento: new Date(),
      fechaEmision: new Date(),
      inicioFinCuil: 0
    }
  );
  const PDF417 = "00622430246@PATINELLA NARVAEZ@EDUARDO MICHEL@M@39008363@C@04/12/1995@28/12/2019@208"
  //numero-tramite@apellidos@nombres@sexo@numero-dni@ejemplar@nacimiento@fecha de emision@inicio-fin-cuil
  const navigate = useNavigate();

  useEffect(() => {
    getRecorder().id ? console.log("REGISTRADOR DEFINIDO: " + JSON.stringify(getRecorder().id)) : navigate("/login");
  }, []);


  const obtenerDatos = (documento: string, delimitador: string) => {
    let datosDocumento = documento.split(delimitador);
    let nacimientoAux = datosDocumento[6].split("/");
    let fechaEmisionAux = datosDocumento[7].split("/");
    /*
    for (let i=0; i < datosDocumento.length; i++) {
      console.log(datosDocumento[i]);
    }
    for (let i=0; i < nacimientoAux.length; i++) {
      console.log(nacimientoAux[i]);
    }
    for (let i=0; i < fechaEmisionAux.length; i++) {
      console.log(fechaEmisionAux[i]);
    }
    */

    const nacimiento: Date = new Date();
    nacimiento.setFullYear(parseInt(nacimientoAux[2]));
    nacimiento.setMonth(parseInt(nacimientoAux[1]) - 1);
    nacimiento.setDate(parseInt(nacimientoAux[0]));

    const fechaEmisionC: Date = new Date();
    fechaEmisionC.setFullYear(parseInt(fechaEmisionAux[2]));
    fechaEmisionC.setMonth(parseInt(fechaEmisionAux[1]) - 1);
    fechaEmisionC.setDate(parseInt(fechaEmisionAux[0]));

    //console.log("fecha nacimiento: " + nacimiento.getMonth());
    //console.log("fecha emision: " + fechaEmisionC.getMonth());

    const dni: Dni = {
      id: 0,
      numeroTramite: parseInt(datosDocumento[0]),
      apellidos: datosDocumento[1],
      nombres: datosDocumento[2],
      sexo: datosDocumento[3],
      numeroDni: parseInt(datosDocumento[4]),
      ejemplar: datosDocumento[5],
      nacimiento: nacimiento,
      fechaEmision: fechaEmisionC,
      inicioFinCuil: parseInt(datosDocumento[8])
    }
    setDni(dni);
    return datosDocumento;
  }

  const handleAssociateCustomer = async (dni: Dni) => {
    console.log("Handle Associate Customer");
    if (dni.numeroDni == 0) {
      alert("No hay datos del cliente");
      return 0;
    } else {
      const res = await associateCustomer(dni);
      if (res != 0) {
        setNewMember(res);
      } else {
        alert("No se pudo asociar el cliente");
      }
    }
  }

  return (
    <>
      <CabeceraComponent/>
      <div className='associateCustomerContainer'>
        <div className="dataDniContainer">
          <b>Número de trámite: </b> {dni?.numeroTramite ? dni.numeroTramite : ""} <br />
          <b>Apellidos: </b> {dni?.apellidos ? dni.apellidos : ""} <br />
          <b>Nombres: </b> {dni?.nombres ? dni.nombres : ""} <br />
          <b>Sexo: </b> {dni?.sexo ? dni.sexo : ""} <br />
          <b>Número DNI: </b> {dni?.numeroDni ? dni.numeroDni : ""} <br />
          <b>Ejemplar: </b> {dni?.ejemplar ? dni.ejemplar : ""} <br />
          <b>Nacimiento: </b> {dni?.nacimiento ? (dni.nacimiento.getDate() + "/" + (dni.nacimiento.getMonth() + 1) + "/" + dni.nacimiento.getFullYear()) : ""} <br />
          <b>Fecha de emisión: </b>{dni?.fechaEmision ? (dni.fechaEmision.getDate() + "/" + (dni.fechaEmision.getMonth() + 1) + "/" + dni.fechaEmision.getFullYear()) : ""} <br />
          <b>Inicio fin cuil: </b>{dni?.inicioFinCuil ? dni.inicioFinCuil : ""} <br />
          <div style={{ marginTop: '25px' }}>
            <Button
              onClick={() => obtenerDatos(PDF417, "@")}
              color="success"
              variant='contained'
            >
              Generar datos
            </Button>
          </div>

          <div style={{ marginTop: '25px' }}>
            <Button
              onClick={() => handleAssociateCustomer(dni)}
              color="success"
              variant='contained'
            >
              Agregar cliente
            </Button>
          </div>
        </div>

        <div className='qrContainer'>
          <div className='qrImage'>
            <br></br>
            {newMember.id && (
              <QRCodeCanvas
                value={newMember.identificador}
                size={350}
              />
            )}
          </div>

          <div className='qrText'>
            <p> {newMember.identificador ? ("QR-IDENTIFICADOR para: \n" + dni.nombres + " " + dni.apellidos) : ""} </p>
          </div>
        </div>
      </div>

      <div>
        <div style={{ marginLeft: "25%", marginTop: '200px', alignContent: 'center', alignItems: "center" }}>
          
        {newMember.id && (
              <Button
              onClick={() => handleAssociateCustomer(dni)}
              color="success"
              variant='contained'
            >
              Enviar por wpp
            </Button>
            )}
              
        </div>
      </div>
    </>
  );
}

export default AssociateCustomer;