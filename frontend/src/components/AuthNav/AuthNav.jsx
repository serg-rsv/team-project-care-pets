import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import s from './AuthNav.module.scss';

const AuthNav = ({ closeModal }) => {
  const { t } = useTranslation('common');

  return (
    <div className={s.authNav}>
      <ul className={s.authNav__list}>
        <li className={s.authNav__item}>
          <NavLink
            to={'/login'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
            onClick={closeModal}
          >
            {t('AuthNav.login')}
          </NavLink>
        </li>
        <li className={s.authNav__item}>
          <NavLink
            to={'/register'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
            onClick={closeModal}
          >
            {t('AuthNav.register')}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AuthNav;
