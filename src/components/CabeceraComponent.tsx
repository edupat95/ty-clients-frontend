import React, { FC } from 'react';
import { Club } from '../models/club.model';
import { getSession } from '../utilities/public.utilities';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';



const CabeceraComponent = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div style={{ display: "flex" }}>
            <div >
                <p> {"Usuario: " + (getSession().firstName ? getSession().firstName : "WITH OUT NAME")} </p>
            </div>
            <div style={{ paddingLeft: "50px" }}>
                <p> {"Empresa: " + (getSession().club.nombre ? getSession().club.nombre : logout())} </p>
            </div>
            <div style={{ paddingLeft: "60%", paddingTop: "1%" }}>
                <Button
                    onClick={() => logout()}
                    color="error"
                    variant='contained'
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default CabeceraComponent;