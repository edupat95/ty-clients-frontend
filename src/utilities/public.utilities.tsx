import { User } from '../models/user.model'; 
import { Worker } from '../models/worker.model';
import { Recorder } from '../models/AssociateCustomer/recorder.model';
import { Cashier } from '../models/Cashier/cashier.model';
import { useNavigate } from 'react-router-dom';
/*
const logout = () => {
  const navigate = useNavigate();;

  localStorage.clear();
  navigate('/login');
}
*/
  
const getSession = () => {
  let userSession = localStorage.getItem('user');
  //console.log("Datos public utilities de usuario" + userSession)
  let userObjeto: User = JSON.parse(userSession ? userSession : "{}");
  return userObjeto;
}

const getWorker = () => {
  let workerSession = localStorage.getItem('worker');
  //console.log("Datos public utilities de trabajador" + workerSession)
  let workerObjeto: Worker = JSON.parse(workerSession ? workerSession : "{}");
  return workerObjeto;
}

const getCashier = () => {
  let cashierSession = localStorage.getItem('cashier');
  //console.log("Datos public utilities de cajero" + cashierSession)
  let cashierObjeto: Cashier = JSON.parse(cashierSession ? cashierSession : "{}");
  return cashierObjeto;
}

const getRecorder = () => {
  let recorderSession = localStorage.getItem('recorder');
  //console.log("Datos public utilities de recorder" + recorderSession)
  let recorderObjeto: Recorder = JSON.parse(recorderSession ? recorderSession : "{}");
  return recorderObjeto;
}


export { getSession , getWorker, getCashier, getRecorder};