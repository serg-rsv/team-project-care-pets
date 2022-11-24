import {
  useAddFavoritesByIdMutation,
  useDeleteFavoritesByIdMutation,
  useDeleteNoticeMutation,
} from '../../../redux/services/noticesSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../Button';
import ModalNotice from '../ModalNotice';
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
  const { openModal } = useModal();
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
<<<<<<< HEAD
  const linkPhone = <a href={`tel:${noticeById?.owner?.phone}`}>Contact</a>;
=======
  const linkPhone = (
    <a href={`tel:${noticeById?.owner?.phone}`}>
      Зателефонувати
    </a>
  );
>>>>>>> 5c2416c72be9da3b7d3447bffcb538986de371a8

  const svgIcon = (
    <>
      <p className={s.addToFavoriteButtonText}>Додати в</p>
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
            fill-opacity="0.6"
          />
          <path
            d="M7 1C3.6868 1 1 3.73373 1 7.10648C1 9.8291 2.05 16.2909 12.3856 22.8229C12.5707 22.9387 12.7833 23 13 23C13.2167 23 13.4293 22.9387 13.6144 22.8229C23.95 16.2909 25 9.8291 25 7.10648C25 3.73373 22.3132 1 19 1C15.6868 1 13 4.70089 13 4.70089C13 4.70089 10.3132 1 7 1Z"
            stroke="#F59256"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
      <div className={s.animalListBoxText}>
        <p className={s.breed}>Порода:</p>
        <p>{breed}</p>
      </div>
      <div className={s.animalListBoxText}>
        <p className={s.place}>Місце:</p>
        <p>{place}</p>
      </div>
      <div className={s.animalListBoxText}>
        <p className={s.age}>Вік:</p>
        <p>{age}</p>
      </div>
      {checkCategory ? (
        <div className={s.animalListBoxText}>
          <p className={s.price}>Ціна:</p>
          <p>{price}</p>
        </div>
      ) : (
        <div className={s.animalListBoxText}>
          <p className={s.priceOpacity}>P</p>
        </div>
      )}
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
        disabled={!isLoggedIn}
        onClick={() => (isFavorite ? deleteFavorite(_id) : addFavorite(_id))}
        className={`${s.like} ${isFavorite ? s.isActiveLike : ''}`}
      ></Button>

      {isActive && (
        <Button onClick={() => deleteNotice(_id)} className={s.remove}></Button>
      )}

      <Modal
        marker={`learnmore${_id}`}
        closeButton={true}
        leftButton={isFavorite ? false : true}
        leftButtonContent={svgIcon}
        leftButtonStyle={s.addToFavoriteButton}
        leftButtonClick={() => addFavorite(_id)}
        rightButton={true}
        rightButtonContent={linkPhone}
        disabled={!isLoggedIn}
      >
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
      </Modal>
    </li>
  );
};

export default NoticeCategoryItem;
