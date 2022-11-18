import React from 'react';
import scss from './PetsData.module.scss';
import Button from '../Button';
import PropTypes from 'proptypes';
import { useDeletePetMutation } from '../../redux/services/petsSlice';

const PetsData = ({ id, photoURL, name, birthday, breed, comments }) => {
  const [deletePet, result] = useDeletePetMutation();
  console.log('id', id);
  console.log(result);

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
          Name: <p className={scss.text}>{name}</p>
        </li>
        <li className={scss.listItem}>
          Date of birth: <p className={scss.text}>{getDate(birthday)}</p>
        </li>
        <li className={scss.listItem}>
          Breed: <p className={scss.text}>{breed}</p>{' '}
        </li>
        <li className={scss.listItem}>
          Comments: <p className={scss.text}>{comments}</p>
        </li>
      </ul>
      <Button className={scss.iconBtn} onClick={() => deletePet(id)}></Button>
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
