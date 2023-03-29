import { useTranslation } from 'react-i18next';

import SponsorCard from '../../components/SponsorCard';
import sponsors from '../../hardcodeData/sponsors.json';
import s from './OurFriendsPage.module.scss';

const OurFriendsPage = () => {
  const { t } = useTranslation('common');

  return (
    <section className="container">
      <h2 className={s.pageTitle}>{t('OurFriendsPage.ourFriends')}</h2>
      <ul className={s.friendsList}>
        {sponsors.map((sponsor, index) => (
          <li key={index} className={s.friendsList__item}>
            <SponsorCard obj={sponsor} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OurFriendsPage;
