import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFetchNoticesMutation } from '../../redux/services/noticesSlice';
import { setNotices, setIsLoadMore } from '../../redux/noticesSlice';
import { useCurrentQuery } from '../../redux/services/usersSlice';
import Container from '../../components/PetPage/NoticesCategoriesNav/Container';
import SearchForm from '../../components/SearchForm';
import NoticesCategoriesNav from '../../components/PetPage/NoticesCategoriesNav';
import { markFavoriteNotice } from '../../helpers/markFavoriteNotice';
import style from './NoticesPage.module.scss';

const NoticesPage = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const location = useLocation();
  const [fetchNotices] = useFetchNoticesMutation();
  const { data: user } = useCurrentQuery();

  const handleSubmit = async query => {
    const category = location.pathname.split('NoticesPage./').pop();

    const { data } = await fetchNotices({
      title: query,
      category: category === 'notices' ? 'sell' : category,
    });

    if (data.length > 0) {
      const markedNotices = markFavoriteNotice(data, user?.user?.favorites);
      dispatch(setNotices(markedNotices));
      dispatch(setIsLoadMore(false));
    } else {
      toast.info(t('NoticesPage.noResults'));
    }
  };

  return (
    <section className="container">
      <div className={style.noticesContent}>
        <h2 className={style.pageTitle}>{t('NoticesPage.findYourFavorite')}</h2>
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
