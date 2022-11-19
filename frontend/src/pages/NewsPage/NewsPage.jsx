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
    <>
      <h2>News</h2>
      <SearchBox seachQuery={searchingData} />
      <ul>
        {news.map((el, index) => (
          <li key={index}>
            <NewsCard obj={el} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NewsPage;
