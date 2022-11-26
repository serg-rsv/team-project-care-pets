import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './NoticesCategoriesList.module.scss';
import NoticeCategoryItem from '../NoticeCategoryItem';
import AddNoticeButton from '../AddNoticeButton';
import ModalAddNotice from '../../ModalAddNotice';
import { selectIsLoggedIn } from '../../../redux/selectors';
import { getAge } from '../../../helpers/getAge';
import { useModal } from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';
import Button from '../../Button';
// import ModalNotAuthorized from '../../ModalNotAuthorized';

const NoticesCategoriesList = ({ pets, isActive }) => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { openModal, closeModal } = useModal();

  const [filter, setFilter] = useState({});

  const createAds = async filter => {
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
              price={`${price}₴`}
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
        <Modal marker="addpet" closeButton={true}>
          <div className={s.wrapper}>
            <h3>Ви не авторизовані!</h3>
            <p> Увійдіть або зареєструйтесь!</p>
            <div className={s.buttonsWrapper}>
              <Button
                onClick={() => {
                  navigate('/login');
                  closeModal();
                }}
              >
                Вхід
              </Button>
              <Button
                onClick={() => {
                  navigate('/register');
                  closeModal();
                }}
              >
                Реєстрація
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

NoticesCategoriesList.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool.isRequired,
    })
  ),
};

export default NoticesCategoriesList;
