import { useTranslation } from 'react-i18next';

import s from './SponsorCard.module.scss';
import defaultImg from '../../images/logo/logo.png';

const SponsorCard = ({ obj }) => {
  const { t } = useTranslation('common');
  const { title, url, addressUrl, imageUrl, address, workDays, phone, email } =
    obj;
  const workTime = workDays
    ? workDays.reduce((acc, el, index, array) => {
        let day = '';

        switch (index) {
          case 0:
            day = t('SponsorCard.mon');
            break;
          case 1:
            day = t('SponsorCard.tue');
            break;
          case 2:
            day = t('SponsorCard.wed');
            break;
          case 3:
            day = t('SponsorCard.thu');
            break;
          case 4:
            day = t('SponsorCard.fri');
            break;
          case 5:
            day = t('SponsorCard.sat');
            break;
          case 6:
            day = t('SponsorCard.sun');
            break;

          default:
            break;
        }

        if (!el.isOpen) {
          acc.push({ day, time: t('SponsorCard.closed') });
          return acc;
        }

        acc.push({ day, time: `${el.from} - ${el.to}` });
        return acc;
      }, [])
    : null;

  return (
    <div className={s.sponsorCard}>
      <h3 className={s.sponsorCardTitle}>
        <a href={url} target="_blanc" className={s.sponsorLink}>
          {title}
        </a>
      </h3>
      <div className={s.sponsorInfo}>
        <img
          src={imageUrl ?? defaultImg}
          alt="logo"
          className={s.sponsorLogo}
        />
        <ul className={s.infoList}>
          <li className={s.infoList__item}>
            <div className={s.workTime}>
              <p className={s.infoTitle}>{t('SponsorCard.workingHours')}</p>
              <p>
                {workTime
                  ? workTime.find(day => day.time !== 'Closed').time
                  : '----'}
              </p>
              {workTime && (
                <div className={s.timeInfo}>
                  <table>
                    <tbody>
                      {workTime?.map((el, index) => {
                        return (
                          <tr key={index}>
                            <td>{el.day}</td>
                            <td className={s.time}>{el.time}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </li>
          <li className={s.infoList__item}>
            <p className={s.infoTitle}>{t('SponsorCard.address')}</p>
            <p>
              {address ? (
                <a href={addressUrl} target="_blanc" className={s.addressLink}>
                  {address}
                </a>
              ) : (
                '----'
              )}
            </p>
          </li>
          <li className={s.infoList__item}>
            <p className={s.infoTitle}>Email:</p>
            <p>
              {email ? (
                <a href={['mailto:', email].join('')} className={s.emailLink}>
                  {email}
                </a>
              ) : (
                '-----'
              )}
            </p>
          </li>
          <li className={s.infoList__item}>
            <p className={s.infoTitle}>{t('SponsorCard.phone')}</p>
            <p>
              {phone ? (
                <a href={['tel:', phone].join('')} className={s.phoneLink}>
                  {phone}
                </a>
              ) : (
                '----'
              )}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SponsorCard;
