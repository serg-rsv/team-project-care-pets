import { useTranslation } from 'react-i18next';

import styles from './NotFound.module.scss';
import wonderWError from '../../images/wonderW.svg';

const NotFound = () => {
  const { t } = useTranslation('common');

  return (
    <section className={styles.section}>
      <div className={['container', styles.wrapper].join(' ')}>
        <h2 className="visually-hidden">{t('NotFound.pageNotFound')}</h2>
        <img
          className={styles.panda}
          src={wonderWError}
          alt="Wonder Worker customed error page"
        />
      </div>
    </section>
  );
};

export default NotFound;
