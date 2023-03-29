import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { setNotices } from '../../redux/noticesSlice';
import s from './Nav.module.scss';

const Nav = ({ closeModal }) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  return (
    <nav>
      <ul className={s.navList}>
        <li className={s.navList__item}>
          <NavLink
            to={'/news'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
            onClick={closeModal}
          >
            {t('Nav.news')}
          </NavLink>
        </li>
        <li className={s.navList__item}>
          <NavLink
            to={'/notices'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
            onClick={() => {
              closeModal();
              dispatch(setNotices([]));
            }}
          >
            {t('Nav.findAnimal')}
          </NavLink>
        </li>
        <li className={s.navList__item}>
          <NavLink
            to={'/friends'}
            className={({ isActive }) => (isActive ? s.active : undefined)}
            onClick={closeModal}
          >
            {t('Nav.ourFriends')}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
