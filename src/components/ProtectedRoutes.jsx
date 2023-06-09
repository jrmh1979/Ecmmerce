import { Navigate, Outlet } from "react-router-dom";
import React from 'react';


const ProtectedRoutes = () => {

    // ¿como sabemos si hay inicio de sesion 
    // por que si el usuario inicio sesion habra un token guardado

    const tokenValue = localStorage.getItem ("token")
    //renderizado condicional
    //Outlet representa la vista
    if (tokenValue) {
        return <Outlet/> 
    } else {
        return <Navigate to="/login"/>
    }
};

export default ProtectedRoutes;