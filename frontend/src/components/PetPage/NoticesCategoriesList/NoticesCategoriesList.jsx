import s from './NoticesCategoriesList.module.scss';
import NoticeCategoryItem from '../NoticeCategoryItem';
import AddNoticeButton from '../AddNoticeButton';

const NoticesCategoriesList = ({ pets, addFavorites, removeAds, isActiv }) => {
  return (
    <div className={s.box}>
      <ul className={s.animalList}>
        {pets.map(
          ({
            _id,
            photoURL,
            title,
            breed,
            location,
            birthday,
            price,
            category,
          }) => (
            <NoticeCategoryItem
              key={_id}
              _id={_id}
              link={photoURL}
              title={title}
              breed={breed}
              place={location}
              age={birthday}
              price={`${price}$`}
              page={category}
              addFavorites={addFavorites}
              removeAds={removeAds}
              isActiv={isActiv}
            />
          )
        )}
      </ul>
      <AddNoticeButton />
    </div>
  );
};

export default NoticesCategoriesList;
