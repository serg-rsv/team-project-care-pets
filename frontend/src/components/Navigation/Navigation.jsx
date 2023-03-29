import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../redux/selectors';
import Nav from '../Nav';
import UserNav from '../UserNav';
import AuthNav from '../AuthNav';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Button from '../Button';
import s from './Navigation.module.scss';

const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthorized = useSelector(selectIsLoggedIn);

  const onBurgerClick = e => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={s.navigation}>
      <Button className={s.burgerBtn} onClick={onBurgerClick}>
        <svg
          width="30"
          height="20"
          viewBox="0 0 30 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20H30V16.6667H0V20ZM0 11.6667H30V8.33333H0V11.6667ZM0 0V3.33333H30V0H0Z"
            fill="#212121"
          />
        </svg>
      </Button>

      {isModalOpen && (
        <div className={s.mobMenu}>
          {isAuthorized ? (
            <UserNav closeModal={onBurgerClick} />
          ) : (
            <AuthNav closeModal={onBurgerClick} />
          )}
          <LanguageSwitcher />
          <Nav closeModal={onBurgerClick} />
        </div>
      )}

      {isModalOpen ? (
        <div className={s.tabMenu}>
          <Nav closeModal={onBurgerClick} />
        </div>
      ) : (
        <div className={s.authTabMenu}>
          {isAuthorized ? <UserNav /> : <AuthNav />}
          <LanguageSwitcher />
        </div>
      )}

      <div className={s.deskMenu}>
        <Nav />
        {isAuthorized ? <UserNav /> : <AuthNav />}
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Navigation;
