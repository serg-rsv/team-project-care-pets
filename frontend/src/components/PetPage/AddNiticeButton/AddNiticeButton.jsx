import Button from '../../button';
import s from './AddNiticeButton.module.scss';

const AddNiticeButton = () => {
  return (
    <div className={s.addBox}>
      <p>Add pet</p>
      <Button className={s.addButton}></Button>
    </div>
  );
};

export default AddNiticeButton;
