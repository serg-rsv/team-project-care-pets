import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import {
  useAddFavoritesByIdMutation,
  useDeleteFavoritesByIdMutation,
  useDeleteNoticeMutation,
} from '../../../redux/services/noticesSlice';
import { useGetNoticeByIdQuery } from '../../../redux/services/noticesSlice';
import { setIsFavorite } from '../../../redux/noticesSlice';
import { selectIsLoggedIn, selectLanguage } from '../../../redux/selectors';
import convectorCategory from '../../../helpers/convectorCategory';
import { useModal } from '../../../hooks/useModal';
import { Loader } from '../../Loader/Loader';
import Button from '../../Button';
import ModalNotice from '../ModalNotice/ModalNotice';
import Modal from '../../Modal/Modal';
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
  const { t } = useTranslation('common');
  const currentLanguage = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const checkCategory = page === 'sell';
  const [deleteNotice, { isLoading: isLoadingDelNotice }] =
    useDeleteNoticeMutation();
  const [addFavorite, { isLoading: isLoadingAddFav }] =
    useAddFavoritesByIdMutation();
  const [deleteFavorite, { isLoading: isLoadingDelFav }] =
    useDeleteFavoritesByIdMutation();
  const [id, setId] = useState('');
  const { openModal } = useModal();
  const { data: item, isFetching } = useGetNoticeByIdQuery(id);
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

  const linkPhone = (
    <a className={s.phoneButtonText} href={`tel:${noticeById?.owner?.phone}`}>
      {t('NoticeCategoryItem.contact')}
    </a>
  );

  const favoriteToggle = async () => {
    if (isFavorite) {
      await deleteFavorite(_id)
        .unwrap()
        .then(() => {
          toast.success(
            t('NoticeCategoryItem.removedFromFavorites', { title })
          );
        })
        .catch(() => {
          toast.error(
            t('NoticeCategoryItem.failedToRemoveFromFavorites', { title })
          );
        });

      dispatch(setIsFavorite({ _id, isFavorite: false }));
    } else {
      await addFavorite(_id)
        .unwrap()
        .then(() =>
          toast.success(t('NoticeCategoryItem.addedToFavorites', { title }))
        )
        .catch(() => {
          toast.error(
            t('NoticeCategoryItem.failedToAddToFavorites', { title })
          );
        });

      dispatch(setIsFavorite({ _id, isFavorite: true }));
    }
  };

  const addNotification = () => {
    toast.info(t('NoticeCategoryItem.loginRequired'));
  };

  const svgIcon = (
    <>
      {isFavorite ? (
        <span className={s.addToFavoriteButtonText}>
          {t('NoticeCategoryItem.removeFrom')}
        </span>
      ) : (
        <span className={s.addToFavoriteButtonText}>
          {t('NoticeCategoryItem.addTo')}
        </span>
      )}
      <span className={s.buttonHeart}></span>
    </>
  );

  return (
    <li className={s.animalListItem}>
      <div className={s.signature}>
        <p>{convectorCategory(page, currentLanguage)}</p>
      </div>
      <div className={s.imageWrapper}>
        <img className={s.animalListImg} src={link} alt={title} />
      </div>
      <h3 className={s.animalListTitle}>{title}</h3>
      <ul className={s.discription}>
        <li className={s.animalListBoxText}>
          {t('NoticeCategoryItem.breed')}
          <p> {breed}</p>
        </li>
        <li className={s.animalListBoxText}>
          {t('NoticeCategoryItem.location')}
          <p>{place}</p>
        </li>
        <li className={s.animalListBoxText}>
          {t('NoticeCategoryItem.age')}
          <p>{age}</p>
        </li>
        {checkCategory ? (
          <li className={s.animalListBoxText}>
            {t('NoticeCategoryItem.price')}
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
        {t('NoticeCategoryItem.learnMore')}
      </Button>
      <Button
        disabled={isLoadingAddFav || isLoadingDelFav}
        onClick={async () =>
          isLoggedIn ? await favoriteToggle() : addNotification()
        }
        className={`${s.like} ${isFavorite ? s.isActiveLike : ''}`}
      ></Button>
      {isActive && (
        <Button
          disabled={isLoadingDelNotice}
          onClick={async () => {
            await deleteNotice(_id)
              .unwrap()
              .then(() => {
                toast.success(t('NoticeCategoryItem.noticeRemoved'));
              })
              .catch(() => {
                toast.error(t('NoticeCategoryItem.noticeNotRemoved'));
              });
          }}
          className={s.remove}
        ></Button>
      )}
      {isFetching ? (
        <Loader />
      ) : (
        <Modal marker={`learnmore${_id}`} closeButton={true}>
          <div className={s.wrapper}>
            <ModalNotice
              category={convectorCategory(
                noticeById?.category,
                currentLanguage
              )}
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
              <Button className={s.buttonPhone}>{linkPhone}</Button>
              <Button
                className={s.addToFavoriteButton}
                disabled={isLoadingAddFav || isLoadingDelFav}
                onClick={async () =>
                  isLoggedIn ? await favoriteToggle() : addNotification()
                }
              >
                {svgIcon}
              </Button>
            </div>
          </div>
        </Modal>
      )}
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
