import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import NoticesSearch from '../../components/PetPage/NoticesSearch';

import NoticesCategoriesList from '../../components/PetPage/NoticesCategoriesList';

import { useFetchNoticesQuery } from '../../redux/services/noticesSlice';

import s from './NoticesPage.module.scss';

const NoticesPage = () => {

  
  const { data: items } = useFetchNoticesQuery();
  
  const result = items?.data;

  // const noticesStart = result?.filter(item => item.category === 'sell');


  const [notices, setNotices] = useState(result);

  const noticesFetch = e => {
    const categoryButton = e.target.name;
    const category = result.filter(item => item.category === categoryButton);
    setNotices(category);
  };

  return (
    <div className="container">
        <NoticesSearch />
        <ul className={s.navList}>
          <li>
            <NavLink
              onClick={noticesFetch}
              name="lost-found"
              className={({ isActive }) =>
                `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
              }
              to="lost-found"
            >
              lost/found
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
              }
              onClick={noticesFetch}
              name="for-free"
              to="for-free"
            >
              In good hands
            </NavLink>
          </li>
          <li className={s.sell}>
            <NavLink
              className={({ isActive }) =>
                `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
              }
              onClick={noticesFetch}
              name="sell"
              to="sell"
            >
              sell
            </NavLink>
          </li>
          <li>
            <NavLink
              to="favorite"
              className={({ isActive }) =>
                `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
              }
              onClick={noticesFetch}
              name="favorite"
            >
              Favorite ads
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${s.button}` + (isActive ? ` ${s.carrentColor}` : '')
              }
              onClick={noticesFetch}
              name="own"
              to="own"
            >
              My ads
            </NavLink>
          </li>
        </ul>
      {notices && <NoticesCategoriesList pets={notices} />}
    </div>
  );
};

export default NoticesPage;
