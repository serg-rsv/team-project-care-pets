import s from './AuthNav.module.scss';
import { NavLink } from 'react-router-dom';

const AuthNav = ({ closeModal }) => {
  return (
    <div className={s.authNav}>
      <ul className={s.authNav__list}>
        <li className={s.authNav__item}>
          <NavLink
            to={'/login'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
            onClick={closeModal}
          >
            Вхід
          </NavLink>
        </li>
        <li className={s.authNav__item}>
          <NavLink
            to={'/register'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
            onClick={closeModal}
          >
            Реєстрація
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AuthNav;
