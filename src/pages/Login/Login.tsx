import React, { useEffect, useState } from 'react';
import {login} from '../../services/public.service';
import {createUserAdapter} from '../../adapters/user.adapter'
import { createUser } from '../../redux/states/user';
import "./styles/Login.css";
import { useDispatch} from 'react-redux';
//import { AppStore } from '../../redux/store';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getWorkerByUser, getCashierByWorker, getRecorderByWorker } from '../../services/public.service';


export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const dispatch = useDispatch();
  //const userState = useSelector((store: AppStore) => store.user); 
  const [errorLogin, setErrorLogin] = useState('');
  //const [statusLogin, setStatusLogin] = useState(false);

  const handleClick = async () => {
    //console.log("Datos que tengo que mandar: " + username + " - " + password);
    const user = await login(username, password); 
    //console.log("Login page/handleclick -> " + JSON.stringify(user));
    if(user === 401){
      console.log("Error en las credenciales");
      setErrorLogin("Error en las credenciales");
    }else if (user === 0){
      console.log("Error en el servidor");
      setErrorLogin("Error en el servidor");
    } else {
      setErrorLogin('');
      await dispatch(createUser(createUserAdapter(user)));
      await localStorage.setItem('user', JSON.stringify(user));
      const worker = await getWorkerByUser(user ? user?.id_token: "" , user ? user?.id : 0);
      if(worker){
        const cashier = await getCashierByWorker(user ? user?.id_token: "" , worker ? worker?.id : 0);
        if(cashier){
          await localStorage.setItem('cashier', JSON.stringify(cashier));
          //console.log("Desde login: " + localStorage.getItem('user'),"\n Worker:", cashier.worker , "\n Cajero:" , cashier);
          navigate("/cashier");
        } else {
          console.log("ES UN REGISTRADOR");
          const recorder = await getRecorderByWorker(user ? user?.id_token: "" , worker ? worker?.id : 0);
          if(recorder){
            await localStorage.setItem('recorder', JSON.stringify(recorder));
            //console.log("Desde login: " + localStorage.getItem('user'),"\n Worker:", recorder.worker , "\n Registrador:" , recorder);
            navigate("/associate-customer");
          }
        }
      }
      //await localStorage.setItem('worker', JSON.stringify(worker));
      //setStatusLogin(true); //se puede redireccionar de otra forma, no se cual seria la mejor.
    }
    
  };

  useEffect(() => {
    localStorage.setItem('user', '');
  }, []);

  return (
    <>
      <div className="containerPrincipal">
        <div className="containerSecundario">
          
          <label>Usuario: </label>
          <br />
          <input
            type="text"
            className="inputsStyle"
            name="username"
            onChange={ e => setUsername(e.target.value)}
          />
          <br />
          <label>Contraseña: </label>
          <br />
          <input
            type="password"
            className="inputsStyle"
            name="password"
            onChange={ e => setPassword(e.target.value)}
          />
          <br />
          <div className='button'>
            <Button variant="contained" size='small' color="success" onClick={()=> handleClick()}>Login</Button>
          </div>  
          <p style={{ fontSize: 15, color: 'red' }}>{errorLogin}</p>

          
        </div> 
      </div>
    </>
  );
}

export default Login