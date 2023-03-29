import { useTranslation } from 'react-i18next';

import { useModal } from '../../hooks/useModal';
import PetsList from '../PetsList';
import UserData from '../UserData';
import Modal from '../Modal';
import ModalAddPet from '../ModalAddPet';
import Button from '../Button';
import scss from './UserView.module.scss';

const UserView = () => {
  const { t } = useTranslation('common');
  const { openModal, closeModal } = useModal();

  return (
    <section className={['container', scss.wrapper].join(' ')}>
      <h2 className={scss.titleInfo}>{t('UserView.aboutMe')}</h2>
      <UserData />
      <h2 className={scss.titlePets}>{t('UserView.myPets')}</h2>
      <div className={scss.btnWrapper}>
        <p className={scss.addPetText}>{t('UserView.addPet')}</p>
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
