import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";


const PrivateRoute = () => {
    const isLoggedIn = useSelector() // Тут потрібно дістати селектором  з редакс стейту 
 return  isLoggedIn ? <Outlet/> : <Navigate to = 'login'/>
}

export default PrivateRoute;