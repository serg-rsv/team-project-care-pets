import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/services/authSlice';
import Button from '../../Button';
import s from './NoticesCategoriesNav.module.scss';
const NoticesCategoriesNav = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <ul className={s.navList}>
      <li>
        <NavLink to="/notices/lost-found">
          <Button className={s.button}>lost/found</Button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/notices/for-free">
          <Button className={s.button}>In good hands</Button>
        </NavLink>
      </li>
      <li className={s.sell}>
        <NavLink to="/notices/sell">
          <Button className={s.button}>sell</Button>
        </NavLink>
      </li>

      {/* Приватні ровти */}
      {isLoggedIn && (
        <>
          <li className={s.favorite}>
            <NavLink to="/notices/favorite">
              <Button className={s.button}>Favorite ads</Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/notices/own">
              <Button className={s.button}>My ads</Button>
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NoticesCategoriesNav;

// useParams, Outlet, useLocation
