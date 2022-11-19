import { useDispatch } from 'react-redux';
import { unsetToken } from '../../redux/services/authSlice';
import { useLogoutMutation } from '../../redux/services/usersSlice';
import Button from '../Button/Button';
import scss from './LogOut.module.scss';

import { noticesApi } from '../../redux/services/noticesSlice';
import { petsApi } from '../../redux/services/petsSlice';
import { usersApi } from '../../redux/services/usersSlice';

const LogOut = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const logOut = async () => {
    await logout();
    dispatch(unsetToken());
    dispatch(noticesApi.util.resetApiState());
    dispatch(petsApi.util.resetApiState());
    dispatch(usersApi.util.resetApiState());
  };
  return (
    <Button onClick={logOut} className={scss.logOutBtn}>
      <p className={scss.logOutText}>Log Out</p>
    </Button>
  );
};

export default LogOut;
