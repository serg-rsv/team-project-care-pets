import { toast } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';

import {
  useAddFavoritesByIdMutation,
  useDeleteFavoritesByIdMutation,
  useDeleteNoticeMutation,
} from '../../../redux/services/noticesSlice';
import Button from '../../Button';
import ModalNotice from '../ModalNotice/ModalNotice';
import { useModal } from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';
import { selectIsLoggedIn } from '../../../redux/selectors';

import { useGetNoticeByIdQuery } from '../../../redux/services/noticesSlice';

import s from './NoticeCategoryItem.module.scss';
const NoticeCategoryItem = ({
  _id,
  link,
  title,
  breed,
  place,
  age,
  price,
  page,
  isActive,
  isFavorite,
}) => {
  const checkCategory = page === 'sell';
  const [deleteNotice] = useDeleteNoticeMutation();
  const [addFavorite] = useAddFavoritesByIdMutation();
  const [deleteFavorite] = useDeleteFavoritesByIdMutation();
  const [id, setId] = useState('');
  const { openModal, closeModal } = useModal();
  const { data: item } = useGetNoticeByIdQuery(id);
  const noticeById = item?.data;

  const isLoggedIn = useSelector(selectIsLoggedIn);

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

  const birthday = getDate(noticeById?.birthday);

  const showModalNotice = _id => {
    setId(_id);
  };
  const linkPhone = <a href={`tel:${noticeById?.owner?.phone}`}>Контакт</a>;
  const favoriteToggle = () => {
    if (isFavorite) {
      deleteFavorite(_id);
      toast.success('Тваринку видалено зі списку обраних.');
    } else {
      addFavorite(_id);
      toast.success('Тваринку додано до обраних.');
    }
  };

  const addNotification = () => {
    toast.info('Необхідно авторизуватися.');
  };

  const svgIcon = (
    <>
      {isFavorite ? (
        <p className={s.addToFavoriteButtonText}>Видалити з</p>
      ) : (
        <p className={s.addToFavoriteButtonText}>Додати в</p>
      )}
      <svg
        width="26"
        height="24"
        viewBox="0 0 26 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_3172_13)">
          <path
            d="M7 1C3.6868 1 1 3.73373 1 7.10648C1 9.8291 2.05 16.2909 12.3856 22.8229C12.5707 22.9387 12.7833 23 13 23C13.2167 23 13.4293 22.9387 13.6144 22.8229C23.95 16.2909 25 9.8291 25 7.10648C25 3.73373 22.3132 1 19 1C15.6868 1 13 4.70089 13 4.70089C13 4.70089 10.3132 1 7 1Z"
            fill="white"
            fillOpacity="0.6"
          />
          <path
            d="M7 1C3.6868 1 1 3.73373 1 7.10648C1 9.8291 2.05 16.2909 12.3856 22.8229C12.5707 22.9387 12.7833 23 13 23C13.2167 23 13.4293 22.9387 13.6144 22.8229C23.95 16.2909 25 9.8291 25 7.10648C25 3.73373 22.3132 1 19 1C15.6868 1 13 4.70089 13 4.70089C13 4.70089 10.3132 1 7 1Z"
            stroke="#F59256"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_b_3172_13"
            x="-4"
            y="-4"
            width="34"
            height="32"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_3172_13"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_3172_13"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );

  return (
    <li className={s.animalListItem}>
      <div className={s.signature}>
        <p>{page}</p>
      </div>
      <div className={s.imageWrapper}>
        <img className={s.animalListImg} src={link} alt={title} />
      </div>
      <h3 className={s.animalListTitle}>{title}</h3>
      <ul className={s.discription}>
        <li className={s.animalListBoxText}>
          Порода:
          <p> {breed}</p>
        </li>
        <li className={s.animalListBoxText}>
          Місце:
          <p>{place}</p>
        </li>
        <li className={s.animalListBoxText}>
          Вік:
          <p>{age}</p>
        </li>
        {checkCategory ? (
          <li className={s.animalListBoxText}>
            Ціна:
            <p>{price}</p>
          </li>
        ) : (
          <li className={s.animalListBoxText}>
            <p className={s.priceOpacity}>P</p>
          </li>
        )}
      </ul>
      <Button
        onClick={() => {
          openModal(`learnmore${_id}`);
          showModalNotice(_id);
        }}
        className={s.button}
      >
        Дізнатися більше
      </Button>
      <Button
        onClick={isLoggedIn ? favoriteToggle : addNotification}
        className={`${s.like} ${isFavorite ? s.isActiveLike : ''}`}
      ></Button>
      {isActive && (
        <Button
          onClick={() => {
            deleteNotice(_id);
            toast.success('Оголошення видалено.');
          }}
          className={s.remove}
        ></Button>
      )}
      <Modal marker={`learnmore${_id}`} closeButton={true}>
        <div className={s.wrapper}>
          <ModalNotice
            category={noticeById?.category}
            photoURL={noticeById?.photoURL}
            name={noticeById?.name}
            title={noticeById?.title}
            birthday={birthday}
            breed={noticeById?.breed}
            location={noticeById?.location}
            sex={noticeById?.sex}
            comments={noticeById?.comments}
            email={noticeById?.owner?.email}
            phone={noticeById?.owner?.phone}
            price={noticeById?.price}
          />
          <div className={s.buttonsWrapper}>
            <Button
              className={s.addToFavoriteButton}
              disabled={!isLoggedIn}
              onClick={() => {
                isFavorite ? deleteFavorite(_id) : addFavorite(_id);
              }}
            >
              {svgIcon}
            </Button>
            <Button className={s.buttonPhone}>{linkPhone}</Button>
          </div>
        </div>
      </Modal>
    </li>
  );
};

// NoticeCategoryItem.propTypes = {
//   _id: PropTypes.string.isRequired,
//   link: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   breed: PropTypes.string.isRequired,
//   place: PropTypes.string.isRequired,
//   age: PropTypes.string.isRequired,
//   price: PropTypes.string.isRequired,
//   page: PropTypes.string.isRequired,
//   isActive: PropTypes.bool.isRequired,
//   isFavorite: PropTypes.bool.isRequired,
// };

export default NoticeCategoryItem;
