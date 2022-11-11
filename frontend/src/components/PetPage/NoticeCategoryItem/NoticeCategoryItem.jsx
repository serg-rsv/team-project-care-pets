import s from './NoticeCategoryItem.module.scss';



const NoticeCategoryItem = ({
link, 
title,
breed,
place,
age,
price
}) => {
return (
    <li className={s.animalListItem}>
    <div class={s.signature}>
       <p>In good hands</p>
    </div>
    <img class={s.animalListImg} src={link} alt={title}/>
    <h3 class={s.animalListTitle}>{title}</h3>
    <div class={s.animalListBoxText}>
    <p id={s.breed}>Breed:</p>
    <p>{breed}</p>
    </div>
    <div class={s.animalListBoxText}>
    <p id={s.place}>Place:</p>
    <p>{place}</p>
    </div>
    <div class={s.animalListBoxText}>
    <p id={s.age}>Age:</p>
    <p>{age}</p>
    </div>
    {price && <div class={s.animalListBoxText}>
    <p id={s.price}>Price:</p>
    <p>{price}</p></div>}
    
    
    </li>
   
)

};

export default NoticeCategoryItem;