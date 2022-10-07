import React, { useEffect, useState } from 'react';
import {login} from '../../services/public.service';
import {createUserAdapter} from '../../adapters/user.adapter'
import { createUser } from '../../redux/states/user';
import "./styles/Login.css";
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
export const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const dispatch = useDispatch();
  const userState = useSelector((store: AppStore) => store.user); 
  const [errorLogin, setErrorLogin] = useState('');
  const [statusLogin, setStatusLogin] = useState(false);

  const handleClick = async () => {
    //console.log("Datos que tengo que mandar: " + username + " - " + password);
    const user = await login(username, password); 
    console.log("Login page/handleclick -> " + JSON.stringify(user));
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
      console.log("Desde login: " + localStorage.getItem('user'))
      setStatusLogin(true); //se puede redireccionar de otra forma, no se cual seria la mejor.
    }
    
  };

  useEffect(() => {
    localStorage.setItem('user', '');
  }, []);

  return (
    <>
      <div className="containerPrincipal">
        <div className="containerSecundario">
          
          {(statusLogin && userState.id_token !== '' ) && (
            <Navigate to="/cashier" replace={true} />
          )}

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