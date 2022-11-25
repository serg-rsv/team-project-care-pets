import s from './SponsorCard.module.scss';
import defaultImg from '../../images/logo/logo.png';

const SponsorCard = ({ obj }) => {
  const { title, url, addressUrl, imageUrl, address, workDays, phone, email } =
    obj;

  const workTime = workDays
    ? workDays.reduce((acc, el, index, array) => {
        let day = '';

        switch (index) {
          case 0:
            day = 'пн';
            break;
          case 1:
            day = 'вт';
            break;
          case 2:
            day = 'ср';
            break;
          case 3:
            day = 'чт';
            break;
          case 4:
            day = 'пт';
            break;
          case 5:
            day = 'сб';
            break;
          case 6:
            day = 'нд';
            break;

          default:
            break;
        }

        if (!el.isOpen) {
          acc.push({ day, time: 'Зачинено' });
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
              <p className={s.infoTitle}>Графік роботи:</p>
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
            <p className={s.infoTitle}>Адреса:</p>
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
            <p className={s.infoTitle}>Телефон:</p>
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
