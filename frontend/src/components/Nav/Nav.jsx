import { NavLink } from 'react-router-dom';
import s from './Nav.module.scss';

const Nav = () => {
  return (
    <nav>
      <ul className={s.navList}>
        <li className={s.navList__item}>
          <NavLink
            to={'/news'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
          >
            News
          </NavLink>
        </li>
        <li className={s.navList__item}>
          <NavLink
            to={'/notices'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
          >
            Find pet
          </NavLink>
        </li>
        <li className={s.navList__item}>
          <NavLink
            to={'/friends'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
          >
            Our friend
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
