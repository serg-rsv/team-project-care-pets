import s from './NoticesSearch.module.scss';

const NoticesSearch = () => {
  return (
    <>
      <h1 className={s.lable}>Find your favorite pet</h1>
      <input
        className={s.input}
        type="text"
        placeholder="Search"
        value=""
        onChange=""
      ></input>
    </>
  );
};

export default NoticesSearch;
