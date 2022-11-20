import { useDispatch } from 'react-redux';
import { unsetToken } from '../../redux/services/authSlice';
import { useLogoutMutation } from '../../redux/services/usersSlice';
import Button from '../Button/Button';
import scss from './LogOut.module.scss';

import { baseApi } from '../../redux/services/baseApi';

import { useModal } from '../../hooks/useModal';
import Modal from '../Modal/Modal';

const LogOut = () => {
  const { openModal, closeModal } = useModal();

  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const logOut = async () => {
    await logout();
    dispatch(unsetToken());
    dispatch(baseApi.util.resetApiState());
  };
  return (
    <>
      <Button onClick={() => openModal('logout')} className={scss.logOutBtn}>
        <p className={scss.logOutText}>Log Out</p>
      </Button>
      <Modal
        leftButtonClick={closeModal}
        rightButtonClick={logOut}
        marker="logout"
      >
        Do you really want to quit?
      </Modal>
    </>
  );
};

export default LogOut;
