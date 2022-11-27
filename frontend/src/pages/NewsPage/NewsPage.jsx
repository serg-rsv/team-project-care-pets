import s from './NewsPage.module.scss';
// import newsData from '../../hardcodeData/news.json';
import NewsCard from '../../components/NewsCard';
import SearchBox from '../../components/SearchBox';
import { useState } from 'react';
import { useGetNewsQuery } from '../../redux/services/newsSlice';
import { useEffect } from 'react';

const NewsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data } = useGetNewsQuery(searchValue);
  const [news, setNews] = useState([]);

  // const searchingData = query => {
  //   const result = data.filter(
  //     el => el.title.includes(query) || el.description.includes(query)
  //   );
  //   setNews(result);
  // };

  useEffect(() => {
    setNews(data);
  }, [data]);

  return (
    <section className="container">
      <div className={s.newsContent}>
        <h2 className={s.pageTitle}>Новини</h2>
        <SearchBox searchQuery={setSearchValue} />
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
