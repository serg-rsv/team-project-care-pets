import React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { useDeletePetMutation } from '../../redux/services/petsSlice';
import { useModal } from '../../hooks/useModal';
import Modal from '../Modal/Modal';
import Button from '../Button';
import scss from './PetsData.module.scss';

const PetsData = ({ id, photoURL, name, birthday, breed, comments }) => {
  const { t } = useTranslation('common');
  const { openModal, closeModal } = useModal();
  const [deletePet, { isLoading }] = useDeletePetMutation();

  const onDeletePetClick = async () => {
    await deletePet(id)
      .unwrap()
      .then(() => {
        toast.success(t('PetsData.successfullyDeleted', { name }));
      })
      .catch(() => {
        toast.error(t('PetsData.deleteFailed', { name }));
      });
    closeModal();
  };

  const getDate = birthday => {
    let date = new Date(birthday);
    let year = date.getFullYear();
    let day = date.getDay();
    let month = date.getMonth();
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    return day + '.' + month + '.' + year;
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.imgBox}>
        <img src={photoURL} className={scss.petAvatar} alt="animal avatar" />
      </div>
      <ul>
        <li className={scss.listItem}>
          <dd className={scss.property}>{t('PetsData.name')}</dd>
          <dt className={scss.text}> {name}</dt>
        </li>
        <li className={scss.listItem}>
          <dd className={scss.property}>{t('PetsData.birthdate')}</dd>
          <dt className={scss.text}> {getDate(birthday)}</dt>
        </li>
        <li className={scss.listItem}>
          <dd className={scss.property}>{t('PetsData.breed')}</dd>
          <dt className={scss.text}> {breed}</dt>
        </li>
        <li className={scss.listItem}>
          <dd className={scss.property}>{t('PetsData.comments')}</dd>
          <dt className={scss.text}> {comments}</dt>
        </li>
      </ul>
      <Button
        className={scss.iconBtn}
        onClick={() => openModal(`pets${id}`)}
      ></Button>
      <Modal marker={`pets${id}`}>
        <div className={scss.modalWrapper}>
          <p className={scss.logOutModalText}>{t('PetsData.confirmDelete')}</p>
          <div className={scss.buttonBox}>
            <Button
              disabled={isLoading}
              onClick={() => onDeletePetClick(id)}
              className={scss.button}
            >
              <p className={scss.logOutText}>{t('PetsData.yes')}</p>
            </Button>
            <Button onClick={closeModal} className={scss.button}>
              <p className={scss.logOutText}>{t('PetsData.no')}</p>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PetsData;

// PetsData.propTypes = {
//   id: PropTypes.string,
//   name: PropTypes.string,
//   birthday: PropTypes.string,
//   breed: PropTypes.string,
//   comments: PropTypes.string,
// };
