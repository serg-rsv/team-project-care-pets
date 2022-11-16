import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const PublicRoute = ({restricted = false}) => {
    const isLoggedIn = useSelector(); // Тут потрібно дістати селектором  з редакс стейту
    const shouldRedirect = isLoggedIn && restricted;


    return shouldRedirect ? <Navigate to="/user" /> : <Outlet />;
    
}

export default PublicRoute;