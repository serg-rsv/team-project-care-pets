import Button from '../../button';
import s from './AddNoticeButton.module.scss';

const AddNoticeButton = ({handleTogle}) => {
  return (
    <div className={s.addBox}>
      <p >Add pet</p>
      <Button onClick={handleTogle} className={s.addButton}></Button>
    </div>
  );
};

export default AddNoticeButton;
