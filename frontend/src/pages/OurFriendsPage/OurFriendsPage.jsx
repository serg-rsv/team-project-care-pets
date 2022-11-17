import s from './OurFriendsPage.module.scss';
import sponsors from '../../hardcodeData/sponsors.json';
import SponsorCard from '../../components/SponsorCard';

const OurFriendsPage = () => {
  return (
    <section className="container">
      <h2 className={s.pageTitle}>Our friend</h2>
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
