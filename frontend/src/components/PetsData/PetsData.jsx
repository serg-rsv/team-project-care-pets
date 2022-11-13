import React from 'react';
import scss from './PetsData.module.scss';
import Button from '../button/button';
import PropTypes from 'proptypes';
import Icon from '../../images/iconDel.png';
import IconHover from '../../images/delHover.png';

const PetsData = ({ id, avatarURL, name, birthday, breed, comments }) => {
  const deletePet = id => {
    console.log('delete');
  };

  return (
    <li className={scss.wrapper}>
      <img src={avatarURL} className={scss.petAvatar} alt="animal" />
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
      <Button className={scss.iconBtn} onClick={() => deletePet()}>
        <img
          className={scss.imgBtn}
          src={Icon}
          alt="icon"
          onMouseOver={e => (e.currentTarget.src = IconHover)}
          onMouseOut={e => (e.currentTarget.src = Icon)}
        />
      </Button>
    </li>
  );
};

export default PetsData;

PetsData.propTypes = {
  name: PropTypes.string,
  dateOfBirth: PropTypes.string,
  breed: PropTypes.string,
  comments: PropTypes.string,
};
