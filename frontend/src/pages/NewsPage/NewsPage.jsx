import s from './NewsPage.module.scss';
import newsData from '../../hardcodeData/news.json';
import NewsCard from '../../components/NewsCard';
import SearchBox from '../../components/SearchBox';
import { useState } from 'react';

const NewsPage = () => {
  const data = newsData;
  const [news, setNews] = useState([]);

  const searchingData = query => {
    const result = data.filter(
      el => el.title.includes(query) || el.description.includes(query)
    );
    setNews(result);
  };

  return (
    <section className="container">
      <div className={s.newsContent}>
        <h2 className={s.pageTitle}>News</h2>
        <SearchBox seachQuery={searchingData} />
        <ul className={s.newsList}>
          {news.map((el, index) => (
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
