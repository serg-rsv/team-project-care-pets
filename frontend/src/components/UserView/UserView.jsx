import PetsList from '../PetsList';
import UserData from '../UserData';
import Button from '../Button';
import scss from './UserView.module.scss';

import { useModal } from '../../hooks/useModal';
import Modal from '../Modal/Modal';

const UserView = () => {
  const { openModal, closeModal } = useModal();
  const addPet = () => {
    console.log('addPet');
  };
  return (
    <section className={['container', scss.wrapper].join(' ')}>
      <h2 className={scss.titleInfo}>My information:</h2>
      <UserData />
      <h2 className={scss.titlePets}>My pets:</h2>
      <div className={scss.btnWrapper}>
        <p className={scss.addPetText}>Add pet </p>
        <Button
          className={scss.addPetBtn}
          onClick={() => {
            openModal('addpet');
          }}
        ></Button>
      </div>
      <PetsList />
      <Modal
        marker="addpet"
        leftButtonContent="жми сюда"
        leftButtonClick={closeModal}
        rightButtonContent="добавить пета"
        rightButtonClick={addPet}
      >
        кнопка добавления петов
      </Modal>
    </section>
  );
};

export default UserView;
