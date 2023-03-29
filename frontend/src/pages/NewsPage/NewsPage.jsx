import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useGetNewsQuery } from '../../redux/services/newsSlice';
import SearchForm from '../../components/SearchForm';
import NewsCard from '../../components/NewsCard';
import { Loader } from '../../components/Loader/Loader';
import s from './NewsPage.module.scss';

const NewsPage = () => {
  const { t } = useTranslation('common');
  const [searchValue, setSearchValue] = useState('');
  const { currentData, isFetching } = useGetNewsQuery();
  const { data } = useGetNewsQuery(searchValue);
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (data?.length !== 0) {
      setNews(data);
    } else {
      toast.info(t('NewsPage.noResults'));
      setNews(currentData);
    }
  }, [data]);

  return (
    <section className="container">
      <div className={s.newsContent}>
        <h2 className={s.pageTitle}>{t('NewsPage.news')}</h2>
        <SearchForm searchQuery={setSearchValue} />
        {isFetching && <Loader />}
        <ul className={s.newsList}>
          {news?.map((el, index) => (
            <li key={index} className={s.newsList__item}>
              <NewsCard obj={el} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NewsPage;
