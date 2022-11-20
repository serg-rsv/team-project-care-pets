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
  addFavorites,
  removeAds,
  isActiv,
}) => {

  const { openModal, closeModal } = useModal();

  const { data } = useGetNoticeByIdQuery('d716087c8c2a30fb5064');

  console.log(data?.item);

  const showModalNotice = (_id) => {
    console.log(_id);
   
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
      <Button onClick={() => addFavorites(_id)} className={s.like}></Button>

      {isActiv && (
        <Button onClick={() => removeAds(_id)} className={s.remove}></Button>
      )}

      <Modal marker="learnmore">
        <ModalNotice />
      </Modal>
    </li>
  );
};

export default NoticeCategoryItem;
