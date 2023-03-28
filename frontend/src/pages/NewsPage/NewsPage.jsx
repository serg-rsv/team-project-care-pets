import s from './NewsPage.module.scss';
// import newsData from '../../hardcodeData/news.json';
import NewsCard from '../../components/NewsCard';
import { useState } from 'react';
import { useGetNewsQuery } from '../../redux/services/newsSlice';
import { useEffect } from 'react';
import SearchForm from '../../components/SearchForm';
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader/Loader';

const NewsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { currentData, isFetching } = useGetNewsQuery();
  const { data } = useGetNewsQuery(searchValue);
  const [news, setNews] = useState([]);
  useEffect(() => {
    if (data?.length !== 0) {
      setNews(data);
    } else {
      toast.info(
        'На жаль, за вашим запитом нічого не знайдено, спробуйте ввести інше значення.'
      );
      setNews(currentData);
    }
  }, [data]);

  return (
    <section className="container">
      <div className={s.newsContent}>
        <h2 className={s.pageTitle}>Новини</h2>
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
