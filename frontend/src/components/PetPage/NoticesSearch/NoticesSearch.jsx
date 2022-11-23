import s from './NoticesSearch.module.scss';
import { useLocation } from 'react-router-dom';
import { useFetchNoticesMutation } from '../../../redux/services/noticesSlice';
import { useDispatch } from 'react-redux';
import { setNotices } from '../../../redux/noticesSlice';
import { useCurrentQuery } from '../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../helpers/markFavoriteNotice';

const NoticesSearch = e => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [fetchNotices] = useFetchNoticesMutation();
  const { data: user } = useCurrentQuery();

  const handleSubmit = async e => {
    e.preventDefault();
    const category = location.pathname.split('/')[2];

    const { data } = await fetchNotices({
      title: e.target.elements.search.value,
      category: category ? category : 'sell',
    });

    const markedNotices = markFavoriteNotice(data, user?.user?.favorites);

    dispatch(setNotices(markedNotices));

    e.target.elements.search.value = '';
  };

  return (
    <div className={s.noticesSearchBox}>
      <form onSubmit={e => handleSubmit(e)}>
        <h1 className={s.lable}>Знайдіть свого улюбленця</h1>
        <input
          className={s.input}
          type="text"
          placeholder="Пошук"
          // onChange={handleSearch}
          name="search"
        ></input>
      </form>
    </div>
  );
};

export default NoticesSearch;
