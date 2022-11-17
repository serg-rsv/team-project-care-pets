import { NavLink } from 'react-router-dom';
import s from './Nav.module.scss';

// Заглушки <a>. Нужно будет поменять на NavLink
const Nav = () => {
  return (
    <nav>
      <ul className={s.navList}>
        <li className={s.navList__item}>
          <NavLink to={'/news'}>News</NavLink>
        </li>
        <li className={s.navList__item}>
          <NavLink to={'/friend'}>Find pet</NavLink>
        </li>
        <li className={s.navList__item}>
          <NavLink to="/friend">Our friend</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
