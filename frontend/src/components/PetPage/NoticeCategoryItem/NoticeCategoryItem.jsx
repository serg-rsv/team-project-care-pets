import Button from '../../button';


import s from './NoticeCategoryItem.module.scss';

const NoticeCategoryItem = ({
  photoURL,
  title,
  breed,
  location,
  age,
  price,
  category,
}) => {
  return (
    <li className={s.animalListItem}>
      <div className={s.signature}>
        <p>{category}</p>
      </div>

      {!photoURL || !photoURL === '' ? (
        <img
          className={s.animalListImg}
          src="https://via.placeholder.com/250x200"
          width="100%"
          alt={title}
        />
      ) : (
        <img className={s.animalListImg} src={photoURL} alt={title} />
      )}

      {title ? (
        <h3 className={s.animalListTitle}>{title}</h3>
      ) : (
        <div className={s.animalListBoxText}>
          <p className={s.priceOpacity}>P</p>
        </div>
      )}

      <div className={s.animalListBoxText}>
        <p className={s.breed}>Breed:</p>
        <p>{breed}</p>
      </div>
      {location ? (
        <div className={s.animalListBoxText}>
          <p className={s.place}>Place:</p>
          <p>{location}</p>
        </div>
      ) : (
        <div className={s.animalListBoxText}>
          <p className={s.priceOpacity}>P</p>
        </div>
      )}

      {age ? (
        <div className={s.animalListBoxText}>
          <p className={s.age}>Age:</p>
          <p>{age}</p>
        </div>
      ) : (
        <div className={s.animalListBoxText}>
          <p className={s.priceOpacity}>P</p>
        </div>
      )}

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
      <Button className={s.button}>
        Learn more
      </Button>
      <Button className={s.like}></Button>
      <Button className={s.remove}></Button>
    </li>
  );
};

export default NoticeCategoryItem;
