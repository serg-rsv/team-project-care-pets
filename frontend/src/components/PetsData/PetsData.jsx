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
  function getDate(birthday) {
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
  }

  return (
    <div className={scss.wrapper}>
      <div className={scss.imgBox}>
        <img src={photoURL} className={scss.petAvatar} alt="animal avatar" />
      </div>
      <ul>
        <li className={scss.listItem}>
          <dd className={scss.property}>Name: </dd>
          <dt className={scss.text}>{name}</dt>
        </li>
        <li className={scss.listItem}>
          <dd className={scss.property}>Date of birth: </dd>
          <dt className={scss.text}> {birthday.toString().slice(0, 10)}</dt>
        </li>
        <li className={scss.listItem}>
          <dd className={scss.property}>Breed: </dd>
          <dt className={scss.text}> {breed}</dt>
        </li>
        <li className={scss.listItem}>
          <dd className={scss.property}>Comments: </dd>
          <dt className={scss.text}> {comments}</dt>
        </li>
      </ul>
      {/* <Button className={scss.iconBtn} onClick={() => deletePet(id)}></Button> */}
      <Button
        className={scss.iconBtn}
        onClick={() => openModal('pets')}
      ></Button>
      <Modal
        marker="pets"
        leftButtonClick={closeModal}
        rightButtonClick={() => deletePet(id)}
      >
        Do you realy want to delete pet?
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
