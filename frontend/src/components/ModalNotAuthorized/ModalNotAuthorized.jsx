import { NavLink } from 'react-router-dom';
import s from './ModalNotAuthorized.module.scss';

const ModalNotAuthorized = () => {
  return (
    <div className={s.modalBox}>
      <h3>You are not authorized!</h3>

      <p className={s.modalBoxText}> Please login or register!</p>
    </div>
  );
};

export default ModalNotAuthorized;
