import s from './NoticesSearch.module.scss';

const NoticesSearch = () => {
  const handleSearch = () => {};
  return (
    <div className={s.noticesSearchBox}>
      <h1 className={s.lable}>Find your favorite pet</h1>
      <input
        className={s.input}
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      ></input>
    </div>
  );
};

export default NoticesSearch;

// value=''
