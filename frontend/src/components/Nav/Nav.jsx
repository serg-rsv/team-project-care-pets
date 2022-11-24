import { NavLink } from 'react-router-dom';
import s from './Nav.module.scss';

const Nav = ({ closeModal }) => {
  return (
    <nav>
      <ul className={s.navList}>
        <li className={s.navList__item}>
          <NavLink
            to={'/news'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
            onClick={closeModal}
          >
            Новини
          </NavLink>
        </li>
        <li className={s.navList__item}>
          <NavLink
            to={'/notices'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
            onClick={closeModal}
          >
            Знайти тварину
          </NavLink>
        </li>
        <li className={s.navList__item}>
          <NavLink
            to={'/friends'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
            onClick={closeModal}
          >
            Наші друзі
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
