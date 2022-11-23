import PetsList from '../PetsList';
import UserData from '../UserData';
import Button from '../Button';
import scss from './UserView.module.scss';

import { useModal } from '../../hooks/useModal';
import Modal from '../Modal';
import ModalAddPet from '../ModalAddPet';

const UserView = () => {
  const { openModal, closeModal } = useModal();
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
      <Modal marker="addpet" closeButton={true}>
        <ModalAddPet onCancelButtonClick={closeModal} />
      </Modal>
    </section>
  );
};

export default UserView;
