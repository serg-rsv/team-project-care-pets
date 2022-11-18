import Button from '../../Button';
import s from './AddNoticeButton.module.scss';

const AddNoticeButton = () => {
  return (
    <div className={s.addBox}>
      <p>Add pet</p>
      <Button className={s.addButton}></Button>
    </div>
  );
};

export default AddNoticeButton;
