import s from './NoticesCategoriesList.module.scss';
import NoticeCategoryItem from '../NoticeCategoryItem';
import AddNiticeButton from '../AddNoticeButton';

const NoticesCategoriesList = ({ pets }) => {
  return (
    <div className={s.box}>
      <ul className={s.animalList}>
        {pets.map(({ id, link, title, breed, place, age, price, page }) => (
          <NoticeCategoryItem
            key={id}
            link={link}
            title={title}
            breed={breed}
            place={place}
            age={age}
            price={price}
            page={page}
          />
        ))}
      </ul>
      <AddNiticeButton />
    </div>
  );
};

export default NoticesCategoriesList;
