import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { selectIsLoggedIn, selectLanguage } from '../../../redux/selectors';
import NoticeCategoryItem from '../NoticeCategoryItem';
import AddNoticeButton from '../AddNoticeButton';
import { getAge } from '../../../helpers/getAge';
import { useModal } from '../../../hooks/useModal';
import ModalAddNotice from '../../ModalAddNotice';
import Modal from '../../Modal/Modal';
import Button from '../../Button';
import s from './NoticesCategoriesList.module.scss';

const NoticesCategoriesList = ({ pets, isActive }) => {
  const { t } = useTranslation('common');
  const currentLanguage = useSelector(selectLanguage);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { openModal, closeModal } = useModal();
  const [, setFilter] = useState({});

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
              age={getAge(birthday, currentLanguage)}
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
            <h3>{t('NoticesCategoriesList.notLoggedIn')}</h3>
            <p>{t('NoticesCategoriesList.loginOrRegister')}</p>
            <div className={s.buttonsWrapper}>
              <Button
                onClick={() => {
                  navigate('/login');
                  closeModal();
                }}
              >
                {t('NoticesCategoriesList.login')}
              </Button>
              <Button
                onClick={() => {
                  navigate('/register');
                  closeModal();
                }}
              >
                {t('NoticesCategoriesList.register')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// NoticesCategoriesList.propTypes = {
//   pets: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       photoURL: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       breed: PropTypes.string.isRequired,
//       location: PropTypes.string.isRequired,
//       birthday: PropTypes.string.isRequired,
//       price: PropTypes.string.isRequired,
//       category: PropTypes.string.isRequired,
//       isFavorite: PropTypes.bool.isRequired,
//     })
//   ),
// };

export default NoticesCategoriesList;
