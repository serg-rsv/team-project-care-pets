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
      <h2 className={scss.titleInfo}>Інформація про мене:</h2>
      <UserData />
      <h2 className={scss.titlePets}>Мої тварини:</h2>
      <div className={scss.btnWrapper}>
        <p className={scss.addPetText}>Додати тварину</p>
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
