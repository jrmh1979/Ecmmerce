import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = () => {

    // ¿como sabemos si hay inicio de sesion 
    // por que si el usuario inicio sesion habra un token guardado

    const token = localStorage.getItem ("token")

    if (token) {
        return<Outlet/> 
    } else {
        return <Navigate to="/login"/>
    }
};

export default ProtectedRoutes;