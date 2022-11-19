import s from './NoticesCategoriesList.module.scss';
import NoticeCategoryItem from '../NoticeCategoryItem';
import AddNoticeButton from '../AddNoticeButton';
import { getAge } from '../../../helpers/getAge';

const NoticesCategoriesList = ({ pets }) => {
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
              link={photoURL}
              title={title}
              breed={breed}
              place={location}
              age={getAge(birthday)}
              price={`${price}$`}
              page={category}
            />
          )
        )}
      </ul>
      <AddNoticeButton />
    </div>
  );
};

export default NoticesCategoriesList;
