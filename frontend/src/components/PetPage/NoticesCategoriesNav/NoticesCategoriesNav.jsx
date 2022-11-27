import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { setNotices, setIsLoadMore } from '../../../redux/noticesSlice';
import { selectIsLoggedIn } from '../../../redux/selectors';
import s from './NoticesCategoriesNav.module.scss';

const NoticesCategoriesNav = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const sell = `/notices`;

  return (
    <ul className={s.navList}>
      <li>
        <NavLink
          onClick={() => {
            dispatch(setNotices([]));
            dispatch(setIsLoadMore(true));
          }}
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
<<<<<<< HEAD
          // onClick={() => dispatch(setNotices([]))}
=======
          onClick={() => {
            dispatch(setNotices([]));
            dispatch(setIsLoadMore(true));
          }}
>>>>>>> 917426f6ae0bac6134856410c93e793e19b22b89
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
<<<<<<< HEAD
          // onClick={() => dispatch(setNotices([]))}
=======
          onClick={() => {
            dispatch(setNotices([]));
            dispatch(setIsLoadMore(true));
          }}
>>>>>>> 917426f6ae0bac6134856410c93e793e19b22b89
          className={({ isActive }) =>
            `${s.button}` +
            (isActive || location.pathname === sell ? ` ${s.carrentColor}` : '')
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
