import { useState } from 'react';
import s from './NoticesCategoriesList.module.scss';
import NoticeCategoryItem from '../NoticeCategoryItem';
import AddNoticeButton from '../AddNoticeButton';
import ModalAddNotice from '../../ModalAddNotice';
import Modal from '../Modal';

const NoticesCategoriesList = ({ pets }) => {
  const [togle, setTogle] = useState(false);

  const handleTogle = () => {
    setTogle(togle => !togle);
  };
  console.log(togle);
  return (
    <div className={s.box}>
      <ul className={s.animalList}>
        {pets.map(
          ({ _id, photoURL, title, breed, location, age, price, category }) => (
            <NoticeCategoryItem
              key={_id}
              photoURL={photoURL}
              title={title}
              breed={breed}
              location={location}
              age={age}
              price={price}
              category={category}
            />
          )
        )}
      </ul>

      <AddNoticeButton handleTogle={handleTogle} />
      {togle && (
        <div className={s.modal}> <div className={s.body}><ModalAddNotice handleTogle={handleTogle} /></div></div>
    
      )}
    </div>
  );
};

export default NoticesCategoriesList;
// 