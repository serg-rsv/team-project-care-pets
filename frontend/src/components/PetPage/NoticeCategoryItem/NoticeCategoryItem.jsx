import Button from '../../button';

import s from './NoticeCategoryItem.module.scss';

const NoticeCategoryItem = ({
  link,
  title,
  breed,
  place,
  age,
  price,
  page,
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
      {price && (
        <div className={s.animalListBoxText}>
          <p className={s.price}>Price:</p>
          <p>{price}</p>
        </div>
      )}
      <Button className={s.button}>Learn more</Button>
      <Button className={s.like}></Button>
      <Button className={s.remove}></Button>
    </li>
  );
};

export default NoticeCategoryItem;
