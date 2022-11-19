import s from './NewsCard.module.scss';

const NewsCard = ({ obj }) => {
  const { title, url, description, date = 'dd-mm-yy' } = obj;

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <p>{date?.split('-').join('/')}</p>
        <p>
          <a href={url} target="_blanc">
            Read more
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
