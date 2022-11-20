import { NavLink } from 'react-router-dom';
import s from './ModalNotAuthorized.module.scss';

const ModalNotAuthorized = () => {
  return (
    <div className={s.modalBox}>
      <h3>You are not authorized!</h3>
      <ul className={s.list}>
        <li><p> Please log in!</p></li>
        <li><NavLink className={s.modalBoxLink} to="/login">
        lodin
      </NavLink></li>
      </ul>
    </div>
  );
};

export default ModalNotAuthorized;
