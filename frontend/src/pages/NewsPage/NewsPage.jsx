import s from './NewsPage.module.scss';
// import newsData from '../../hardcodeData/news.json';
import NewsCard from '../../components/NewsCard';
import { useState } from 'react';
import { useGetNewsQuery } from '../../redux/services/newsSlice';
import { useEffect } from 'react';
import SearchForm from '../../components/SearchForm';

const NewsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data } = useGetNewsQuery(searchValue);
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(data);
  }, [data]);

  return (
    <section className="container">
      <div className={s.newsContent}>
        <h2 className={s.pageTitle}>Новини</h2>
        <SearchForm searchQuery={setSearchValue} />
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
