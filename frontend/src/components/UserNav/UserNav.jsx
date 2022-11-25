import { NavLink } from 'react-router-dom';
import s from './UserNav.module.scss';

const UserNav = ({ closeModal }) => {
  return (
    <div className={s.userNav}>
      <NavLink to="/user" className={s.userNav__btn} onClick={closeModal}>
        <svg
          className={s.btnIcon}
          width="24"
          height="24"
          viewBox="-2 -2 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0.333374C5.55998 0.333374 0.333313 5.56004 0.333313 12C0.333313 18.44 5.55998 23.6667 12 23.6667C18.44 23.6667 23.6666 18.44 23.6666 12C23.6666 5.56004 18.44 0.333374 12 0.333374ZM12 5.00004C14.2516 5.00004 16.0833 6.83171 16.0833 9.08337C16.0833 11.335 14.2516 13.1667 12 13.1667C9.74831 13.1667 7.91665 11.335 7.91665 9.08337C7.91665 6.83171 9.74831 5.00004 12 5.00004ZM12 21.3334C9.63165 21.3334 6.83165 20.3767 4.83665 17.9734C6.88019 16.37 9.40254 15.4986 12 15.4986C14.5974 15.4986 17.1198 16.37 19.1633 17.9734C17.1683 20.3767 14.3683 21.3334 12 21.3334Z"
            fill="white"
          />
        </svg>
        Аккаунт
      </NavLink>
    </div>
  );
};

export default UserNav;
