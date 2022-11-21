import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import s from './NoticesCategoriesList.module.scss';
import NoticeCategoryItem from '../NoticeCategoryItem';
import AddNoticeButton from '../AddNoticeButton';
import ModalAddNotice from '../../ModalAddNotice';
import { selectIsLoggedIn } from '../../../redux/services/authSlice';
import { useCreateNoticeMutation } from '../../../redux/services/noticesSlice';
import { getAge } from '../../../helpers/getAge';
import { useModal } from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';
import ModalNotAuthorized from '../../ModalNotAuthorized';

const NoticesCategoriesList = ({ pets, isActive }) => {
  const navigate = useNavigate();
  const [ads, setAds] = useState({});
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { openModal, closeModal } = useModal();
  const [addAds] = useCreateNoticeMutation();

  const [filter, setFilter] = useState({});

  const createAds = async filter => {
    // console.log(value);
    await setFilter(filter);
  };
  return (
    <div className={s.box}>
      <ul className={s.animalList}>
        {pets.map(
          ({
            _id,
            photoURL,
            title,
            breed,
            location,
            birthday,
            price,
            category,
            isFavorite,
          }) => (
            <NoticeCategoryItem
              key={_id}
              _id={_id}
              link={photoURL}
              title={title}
              breed={breed}
              place={location}
              age={getAge(birthday)}
              price={`${price}$`}
              page={category}
              isActive={isActive}
              isFavorite={isFavorite}
            />
          )
        )}
      </ul>
      <AddNoticeButton
        onClick={() => {
          openModal('addpet');
        }}
      />

      {isLoggedIn ? (
        <Modal marker="addpet" closeButton={true}>
          <ModalAddNotice createAds={createAds} closeButton={closeModal} />
        </Modal>
      ) : (
        <Modal
          marker="addpet"
          closeButton={true}
          leftButton={true}
          leftButtonContent={'Login'}
          leftButtonClick={() => {
            navigate('/login');
          }}
          rightButton={true}
          rightButtonContent={'Register'}
          rightButtonClick={() => {
            navigate('/register');
          }}
        >
          <ModalNotAuthorized />
        </Modal>
      )}
    </div>
  );
};

export default NoticesCategoriesList;
