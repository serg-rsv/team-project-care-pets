import { useTranslation } from 'react-i18next';

import s from './NewsCard.module.scss';

const NewsCard = ({ obj }) => {
  const { t } = useTranslation('common');
  const { title, url, description, date = 'dd-mm-yy' } = obj;

  return (
    <div className={s.article}>
      <div>
        <h3 className={s.articleTitle}>{title}</h3>
        <p className={s.articleDescription}>
          {description.substring(0, 300 - title.length) + '...'}
        </p>
      </div>

      <p className={s.articleMeta}>
        <span className={s.metaDate}>
          {date?.split('T').shift().split('-').join('/')}
        </span>
        <a href={url} target="_blanc" className={s.metaLink}>
          {t('NewsCard.readMore')}
        </a>
      </p>
    </div>
  );
};

export default NewsCard;
