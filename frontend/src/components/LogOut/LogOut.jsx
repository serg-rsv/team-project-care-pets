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
    closeModal();
  };
  return (
    <>
      <Button onClick={() => openModal('logout')} className={scss.logOutBtn}>
        <p className={scss.logOutText}>Вийти</p>
      </Button>
      <Modal marker="logout">
        <p className={scss.logOutModalText}>Ви дійсно бажаєте вийти?</p>
        <Button onClick={logOut}>
          <p className={scss.logOutText}>Так</p>
        </Button>
        <Button onClick={closeModal}>
          <p className={scss.logOutText}>Ні</p>
        </Button>
      </Modal>
    </>
  );
};

export default LogOut;
