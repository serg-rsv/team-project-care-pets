import React from 'react';
import scss from './PetsData.module.scss';
import Button from '../button/button';
import PropTypes from 'proptypes';
import { useFetchNoticesQuery } from '../../redux/services/noticesSlice';

const PetsData = ({ id, avatarURL, name, birthday, breed, comments }) => {
  const deletePet = id => {
    console.log('delete');
  };
  const { data } = useFetchNoticesQuery();
  console.log(data);
  return (
    <div className={scss.wrapper}>
      <img src={avatarURL} className={scss.petAvatar} alt="animal avatar" />
      <ul>
        <li className={scss.listItem}>
          Name: <p className={scss.text}>{name}</p>
        </li>
        <li className={scss.listItem}>
          Date of birth: <p className={scss.text}>{birthday}</p>
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
  name: PropTypes.string,
  dateOfBirth: PropTypes.string,
  breed: PropTypes.string,
  comments: PropTypes.string,
};
