import s from './NoticesCategoriesList.module.scss';
import NoticeCategoryItem from '../NoticeCategoryItem'



const NoticesCategoriesList = ({pets}) => {
return (
   <ul className={s.animalList}>
   {pets.map(({
      id,
      link, 
      title,
      breed,
      place,
      age,
      price
   }) => <NoticeCategoryItem
   key={id}
   link={link}
   title={title}
   breed={breed}
   place={place}
   age={age}
   price={price}
   />)}
   
   </ul>
);

};

export default NoticesCategoriesList;