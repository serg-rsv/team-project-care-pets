import s from './AuthNav.module.scss';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const AuthNav = () => {
  const navigate = useNavigate();

  return (
    <div className={s.authNav}>
      <ul className={s.authNav__list}>
        <li className={s.authNav__item}>
          <Button
            className={s.authBtn}
            onClick={() => {
              navigate('/login');
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
