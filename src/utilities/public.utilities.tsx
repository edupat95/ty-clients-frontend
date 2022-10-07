import React from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../models/user.model'; 

const logout = (state: boolean) => {
  console.log("logout: " + state);
  return (
    <>
      {state &&
        <Navigate to="/" replace={true} />
      }
    </>
  )
}

const getSession = () => {
  let userSession = localStorage.getItem('user');//? localStorage.getItem('user') : "{}" ;
  let userObjeto: User = JSON.parse(userSession ? userSession : "{}");
  return userObjeto;
}

export { logout, getSession };