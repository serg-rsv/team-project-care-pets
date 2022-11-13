import s from './NoticesSearch.module.scss';

const NoticesSearch = () => {
  return (
    <div className={s.noticesSearchBox}>
      <h1 className={s.lable}>Find your favorite pet</h1>
      <input
        className={s.input}
        type="text"
        placeholder="Search"
        onChange=""
      ></input>
    </div>
  );
};

export default NoticesSearch;

// value=''
