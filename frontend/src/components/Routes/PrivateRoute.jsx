import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectIsLoggedIn } from '../../redux/selectors';

const PrivateRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
