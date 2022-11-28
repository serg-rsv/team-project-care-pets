import s from './NewsCard.module.scss';

const NewsCard = ({ obj }) => {
  const { title, url, description, date = 'dd-mm-yy' } = obj;

  return (
    <div className={s.article}>
      <div>
        <h3 className={s.articleTitle}>{title}</h3>
        <p className={s.articleDescription}>
          {description.substring(0, 200) + '...'}
        </p>
      </div>

      <p className={s.articleMeta}>
        <span className={s.metaDate}>
          {date?.split('T').shift().split('-').join('/')}
        </span>
        <a href={url} target="_blanc" className={s.metaLink}>
          Читати більше
        </a>
      </p>
    </div>
  );
};

export default NewsCard;
