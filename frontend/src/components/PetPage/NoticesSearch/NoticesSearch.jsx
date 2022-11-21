import s from './NoticesSearch.module.scss';
import { useLocation } from 'react-router-dom';
import { useFetchNoticesMutation } from '../../../redux/services/noticesSlice';

const NoticesSearch = e => {
  const location = useLocation();
  const [fetchNotices] = useFetchNoticesMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    const category = location.pathname.split('/')[2];
    console.log('handleSubmit ~ category', category);

    const { data } = await fetchNotices({
      title: e.target.elements.search.value,
      category,
    });
    console.log(data.data);
    e.target.elements.search.value = '';
  };

  return (
    <div className={s.noticesSearchBox}>
      <form onSubmit={e => handleSubmit(e)}>
        <h1 className={s.lable}>Find your favorite pet</h1>
        <input
          className={s.input}
          type="text"
          placeholder="Search"
          // onChange={handleSearch}
          name="search"
        ></input>
      </form>
    </div>
  );
};

export default NoticesSearch;

// value=''
