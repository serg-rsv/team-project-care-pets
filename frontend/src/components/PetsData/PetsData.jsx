import React from 'react';
import { toast } from 'react-toastify';

import scss from './PetsData.module.scss';
import Button from '../Button';
// import PropTypes from 'proptypes';
import { useDeletePetMutation } from '../../redux/services/petsSlice';

import { useModal } from '../../hooks/useModal';
import Modal from '../Modal/Modal';

const PetsData = ({ id, photoURL, name, birthday, breed, comments }) => {
  const { openModal, closeModal } = useModal();
  const [deletePet, { isLoading }] = useDeletePetMutation();

  // function getDate(birthday) {
  //   let date = new Date(birthday);
  //   let year = date.getFullYear();
  //   let day = date.getDay();
  //   let month = date.getMonth();
  //   if (day < 10) {
  //     day = `0${day}`;
  //   }
  //   if (month < 10) {
  //     month = `0${month}`;
  //   }
  //   return day + '.' + month + '.' + year;
  // }
  const onDeletePetClick = async () => {
    await deletePet(id)
      .unwrap()
      .then(() => {
        toast.success(`${name} успішно видалено.`);
      })
      .catch(() => {
        toast.error(`${name} не вдалось видалити.`);
      });
    closeModal();
  };
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
      <Modal marker={`pets${id}`}>
        <div className={scss.modalWrapper}>
          <p className={scss.logOutModalText}>Ви дійсно бажаєте видалити?</p>
          <div className={scss.buttonBox}>
            <Button
              disabled={isLoading}
              onClick={() => onDeletePetClick(id)}
              className={scss.button}
            >
              <p className={scss.logOutText}>Так</p>
            </Button>
            <Button onClick={closeModal} className={scss.button}>
              <p className={scss.logOutText}>Ні</p>
            </Button>
          </div>
        </div>
      </Modal>
      {/* marker={`pets${id}`}
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
        rightButtonClick={closeModal} */}
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
