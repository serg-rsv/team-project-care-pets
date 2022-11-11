import s from './NoticesSearch.module.scss';

const NoticesSearch = () => {
return (
   <label className={s.lable}>Find your favorite pet
   <input className={s.input} type='text' value='' onChange=""></input>
</label>
   
)

};

export default NoticesSearch;