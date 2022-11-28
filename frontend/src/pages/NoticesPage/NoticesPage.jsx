import SearchForm from '../../components/SearchForm';
import NoticesCategoriesNav from '../../components/PetPage/NoticesCategoriesNav';
import Container from '../../components/PetPage/NoticesCategoriesNav/Container';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFetchNoticesMutation } from '../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../helpers/markFavoriteNotice';
import { setNotices, setIsLoadMore } from '../../redux/noticesSlice';
import style from './NoticesPage.module.scss';

// import s from './NoticesPage.module.scss';
const NoticesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [fetchNotices] = useFetchNoticesMutation();
  const { data: user } = useCurrentQuery();

  const handleSubmit = async query => {
    const category = location.pathname.split('/').pop();

    const { data } = await fetchNotices({
      title: query,
      category: category ? category : 'sell',
    });

    const markedNotices = markFavoriteNotice(data, user?.user?.favorites);

    dispatch(setNotices(markedNotices));
    dispatch(setIsLoadMore(false));
  };

  return (
    <section className="container">
      <div className={style.noticesContent}>
        <h2 className={style.pageTitle}>Знайдіть свого улюбленця</h2>
        <SearchForm searchQuery={handleSubmit} />
        <Container>
          <NoticesCategoriesNav />
          <Outlet />
        </Container>
      </div>
    </section>
  );
};

export default NoticesPage;
