import Button from '../../Button';
import s from './AddNoticeButton.module.scss';
import { useModal } from '../../../hooks/useModal';

const AddNoticeButton = () => {
  const { openModal, closeModal } = useModal();
  return (
    <div
      onClick={() => {
        openModal('addpet');
      }}
      className={s.addBox}
    >
      <p>Додати</p>
      <Button className={s.addButton}></Button>
    </div>
  );
};

export default AddNoticeButton;
