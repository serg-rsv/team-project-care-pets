import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { unsetToken } from '../../redux/services/authSlice';
import { useLogoutMutation } from '../../redux/services/usersSlice';
import { baseApi } from '../../redux/services/baseApi';
import { useModal } from '../../hooks/useModal';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import scss from './LogOut.module.scss';

const LogOut = () => {
  const { t } = useTranslation('common');
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
        <p className={scss.logOutText}>{t('LogOut.logout')}</p>
      </Button>
      <Modal marker="logout">
        <div className={scss.wrapper}>
          <p className={scss.logOutModalText}>{t('LogOut.confirmLogout')}</p>
          <div className={scss.buttonBox}>
            <Button onClick={logOut} className={scss.button}>
              <p className={scss.logOutText}>{t('LogOut.yes')}</p>
            </Button>
            <Button onClick={closeModal} className={scss.button}>
              <p className={scss.logOutText}>{t('LogOut.no')}</p>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogOut;
