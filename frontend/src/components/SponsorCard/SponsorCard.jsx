import { useState } from 'react';
import s from './SponsorCard.module.scss';
import defaultImg from '../../images/logo/logo.png';

const SponsorCard = ({ obj }) => {
  const [timeMenu, setTimeMenu] = useState(false);

  const { title, url, addressUrl, imageUrl, address, workDays, phone, email } =
    obj;

  const workTime = workDays
    ? workDays.reduce((acc, el, index, array) => {
        let day = '';

        switch (index) {
          case 0:
            day = 'mn';
            break;
          case 1:
            day = 'tu';
            break;
          case 2:
            day = 'we';
            break;
          case 3:
            day = 'th';
            break;
          case 4:
            day = 'fr';
            break;
          case 5:
            day = 'sa';
            break;
          case 6:
            day = 'su';
            break;

          default:
            break;
        }

        if (!el.isOpen) {
          acc.push({ day, time: 'Closed' });
          return acc;
        }

        acc.push({ day, time: `${el.from} - ${el.to}` });
        return acc;
      }, [])
    : null;

  const onMouseClick = e => {
    const el = e.target;

    if (!el.id || timeMenu === true) {
      setTimeMenu(false);
    } else {
      setTimeMenu(true);
    }
  };

  return (
    <div onClick={onMouseClick} className={s.sponsorCard}>
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
            <div className={s.workTime} id="time">
              <p id="time" className={s.infoTitle}>
                Time:
              </p>
              <p id="time">
                {workTime
                  ? workTime.find(day => day.time !== 'Closed').time
                  : '----'}
              </p>
            </div>
            {timeMenu && workTime && (
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
          </li>
          <li className={s.infoList__item}>
            <p className={s.infoTitle}>Adress:</p>
            <p>
              <a href={addressUrl} target="_blanc" className={s.addressLink}>
                {address ? address : '----'}
              </a>
            </p>
          </li>
          <li className={s.infoList__item}>
            <p className={s.infoTitle}>Email:</p>
            <p>
              <a href={['mailto:', email].join('')} className={s.emailLink}>
                {email ? email : '-----'}
              </a>
            </p>
          </li>
          <li className={s.infoList__item}>
            <p className={s.infoTitle}>Phone:</p>
            <p>{phone ? phone : '----'}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SponsorCard;
