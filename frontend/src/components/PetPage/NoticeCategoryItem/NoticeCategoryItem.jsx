import s from './NoticeCategoryItem.module.scss';

const NoticeCategoryItem = ({ link, title, breed, place, age, price }) => {
  return (
    <li className={s.animalListItem}>
      <div className={s.signature}>
        <p>In good hands</p>
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
    </li>
  );
};

export default NoticeCategoryItem;
