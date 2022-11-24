import s from './NewsCard.module.scss';

const NewsCard = ({ obj }) => {
  const { title, url, description, date = 'dd-mm-yy' } = obj;

  return (
    <div className={s.article}>
      <h3 className={s.articleTitle}>{title}</h3>
      <p className={s.articleDescription}>{description}</p>
      <div className={s.articleMeta}>
        <p className={s.metaDate}>{date?.split('-').join('/')}</p>
        <p>
          <a href={url} target="_blanc" className={s.metaLink}>
            Читати більше
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
