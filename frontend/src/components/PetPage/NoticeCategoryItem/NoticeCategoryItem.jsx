import Button from '../../Button';

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
  isFavorite,
}) => {
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
      <Button className={s.button}>Learn more</Button>
      <Button
        onClick={() => addFavorites(_id)}
        className={`${s.like} ${isFavorite ? s.isActivLike : ''}`}
      ></Button>

      {isActiv && (
        <Button onClick={() => removeAds(_id)} className={s.remove}></Button>
      )}
    </li>
  );
};

export default NoticeCategoryItem;
