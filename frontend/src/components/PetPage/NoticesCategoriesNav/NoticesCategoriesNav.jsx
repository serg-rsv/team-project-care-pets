import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setNotices } from '../../../redux/noticesSlice';
import { selectIsLoggedIn } from '../../../redux/selectors';
import s from './NoticesCategoriesNav.module.scss';

const NoticesCategoriesNav = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <ul className={s.navList}>
      <li>
        <NavLink
          onClick={() => dispatch(setNotices([]))}
          className={({ isActive }) =>
            `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
          }
          to="/notices/lost-found"
        >
          знайшов/загубив
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => dispatch(setNotices([]))}
          className={({ isActive }) =>
            `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
          }
          to="/notices/for-free"
        >
          у добрі руки
        </NavLink>
      </li>
      <li className={s.sell}>
        <NavLink
          onClick={() => dispatch(setNotices([]))}
          className={({ isActive }) =>
            `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
          }
          to="/notices/sell"
        >
          продається
        </NavLink>
      </li>

      {/* Приватні ровти */}
      {isLoggedIn && (
        <>
          <li className={s.favorite}>
            <NavLink
              className={({ isActive }) =>
                `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
              }
              to="/notices/favorite"
            >
              улюблені
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
              }
              to="/notices/own"
            >
              мої оголошення
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NoticesCategoriesNav;

// useParams, Outlet, useLocation
