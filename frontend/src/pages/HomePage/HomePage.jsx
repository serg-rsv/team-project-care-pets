import { useTranslation } from 'react-i18next';

import s from './HomePage.module.scss';

const HomePage = () => {
  const { t } = useTranslation('common');

  return (
    <div className={s.homePage}>
      <section className="container">
        <h1 className={s.mainTitle}>{t('HomePage.title')}</h1>
      </section>
      <div className={s.section}></div>
    </div>
  );
};

export default HomePage;
