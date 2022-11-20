import s from './AuthNav.module.scss';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const AuthNav = ({ closeMenu }) => {
  const navigate = useNavigate();

  return (
    <div className={s.authNav}>
      <ul className={s.authNav__list}>
        <li className={s.authNav__item}>
          <Button
            className={s.authBtn}
            onClick={() => {
              navigate('/login');
              closeMenu();
            }}
          >
            Login
          </Button>
        </li>
        <li className={s.authNav__item}>
          <Button
            className={s.authBtn}
            onClick={() => {
              navigate('/register');
              closeMenu();
            }}
          >
            Registration
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default AuthNav;
