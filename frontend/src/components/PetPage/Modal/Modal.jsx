import s from './Modal.module.scss';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

const Modal = () => { 

   return createPortal(
     <div className={s.modal}>
       <div className={s.body}>
         {/* <h1>Modal</h1> */}
       </div>
     </div>,
     modalRoot
   );
     
  
}

export default Modal;