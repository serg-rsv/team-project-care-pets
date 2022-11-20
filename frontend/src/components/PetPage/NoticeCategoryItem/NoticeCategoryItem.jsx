import {
  useAddFavoritesByIdMutation,
  useDeleteFavoritesByIdMutation,
  useDeleteNoticeMutation,
} from '../../../redux/services/noticesSlice';
import { useState } from 'react';
import Button from '../../Button';
import ModalNotice from '../ModalNotice';
import { useModal } from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';

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
  const [deleteNotice] = useDeleteNoticeMutation();
  const [addFavorite] = useAddFavoritesByIdMutation();
  const [deleteFavorite] = useDeleteFavoritesByIdMutation();
  const [id, setId] = useState('');
  const { openModal, closeModal } = useModal();

  const { data: item } = useGetNoticeByIdQuery(id);
  const noticeById = item?.data;

  const showModalNotice = _id => {
    setId(_id);
  };

  return (
    <li className={s.animalListItem}>
      <div className={s.signature}>
        <p>{page}</p>
      </div>
      <img className={s.animalListImg} src={link} alt={title} />
      <h3 className={s.animalListTitle}>{title}</h3>
      <div className={s.animalListBoxText}>
        <p className={s.breed}>Breed:</p>
        <p>{breed}</p>
      </div>
      <div className={s.animalListBoxText}>
        <p className={s.place}>Place:</p>
        <p>{place}</p>
      </div>
      <div className={s.animalListBoxText}>
        <p className={s.age}>Age:</p>
        <p>{age}</p>
      </div>
      {price ? (
        <div className={s.animalListBoxText}>
          <p className={s.price}>Price:</p>
          <p>{price}</p>
        </div>
      ) : (
        <div className={s.animalListBoxText}>
          <p className={s.priceOpacity}>P</p>
        </div>
      )}

      <Button
        onClick={() => {
          openModal('learnmore');
          showModalNotice(_id);
        }}
        className={s.button}
      >
        Learn more
      </Button>

      <Button
        onClick={() => (isFavorite ? deleteFavorite(_id) : addFavorite(_id))}
        className={`${s.like} ${isFavorite ? s.isActiveLike : ''}`}
      ></Button>

      {isActive && (
        <Button onClick={() => deleteNotice(_id)} className={s.remove}></Button>
      )}

      <Modal marker="learnmore">
        <ModalNotice
          category={noticeById?.category}
          photoURL={noticeById?.photoURL}
          name={noticeById?.name}
          title={noticeById?.title}
          birthday={noticeById?.birthday}
          breed={noticeById?.breed}
          location={noticeById?.location}
          sex={noticeById?.sex}
          comments={noticeById?.comments}
        />
      </Modal>
    </li>
  );
};

export default NoticeCategoryItem;
