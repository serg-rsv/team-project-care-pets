import React from 'react';
import scss from './PetsData.module.scss';
import Button from '../Button';
import PropTypes from 'proptypes';
import { useDeletePetMutation } from '../../redux/services/petsSlice';

import { useModal } from '../../hooks/useModal';
import Modal from '../Modal/Modal';

const PetsData = ({ id, photoURL, name, birthday, breed, comments }) => {
  const { openModal, closeModal } = useModal();
  const [deletePet, result] = useDeletePetMutation();

  return (
    <div className={scss.wrapper}>
      <div className={scss.imgBox}>
        <img src={photoURL} className={scss.petAvatar} alt="animal avatar" />
      </div>
      <ul>
        <li className={scss.listItem}>
          <dd className={scss.property}>Ім'я: </dd>
          <dt className={scss.text}>{name}</dt>
        </li>
        <li className={scss.listItem}>
          <dd className={scss.property}>Дата народження: </dd>
          <dt className={scss.text}> {birthday.toString().slice(0, 10)}</dt>
        </li>
        <li className={scss.listItem}>
          <dd className={scss.property}>Порода: </dd>
          <dt className={scss.text}> {breed}</dt>
        </li>
        <li className={scss.listItem}>
          <dd className={scss.property}>Коментарі: </dd>
          <dt className={scss.text}> {comments}</dt>
        </li>
      </ul>
      <Button
        className={scss.iconBtn}
        onClick={() => openModal(`pets${id}`)}
      ></Button>
      <Modal
        marker={`pets${id}`}
        leftButton={true}
        leftButtonType={'button'}
        rightButton={true}
        rightButtonType={'button'}
        leftButtonContent={'Так'}
        rightButtonContent={'Ні'}
        leftButtonClick={() => {
          deletePet(id);
          closeModal();
        }}
        rightButtonClick={closeModal}
      >
        Ви дійсно бажаєте видалити?
      </Modal>
    </div>
  );
};

export default PetsData;

PetsData.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  birthday: PropTypes.string,
  breed: PropTypes.string,
  comments: PropTypes.string,
};
