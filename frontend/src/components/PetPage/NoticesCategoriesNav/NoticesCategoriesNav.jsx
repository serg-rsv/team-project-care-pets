import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { selectIsLoggedIn } from '../../../redux/selectors';
import { setNotices, setIsLoadMore } from '../../../redux/noticesSlice';
import s from './NoticesCategoriesNav.module.scss';

const NoticesCategoriesNav = () => {
  const { t } = useTranslation('common');
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
            `${s.button}` +
            (isActive || location.pathname === sell ? ` ${s.carrentColor}` : '')
          }
          to="/notices/sell"
        >
          {t('NoticesCategoriesNav.forSale')}
        </NavLink>
      </li>
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
          {t('NoticesCategoriesNav.lostFound')}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => {
            dispatch(setNotices([]));
            dispatch(setIsLoadMore(true));
          }}
          className={({ isActive }) =>
            `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
          }
          to="/notices/for-free"
        >
          {t('NoticesCategoriesNav.goodHands')}
        </NavLink>
      </li>

      {isLoggedIn && (
        <>
          <li className={s.favorite}>
            <NavLink
              className={({ isActive }) =>
                `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
              }
              to="/notices/favorite"
            >
              {t('NoticesCategoriesNav.favorites')}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
              }
              to="/notices/own"
            >
              {t('NoticesCategoriesNav.myAds')}
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NoticesCategoriesNav;
