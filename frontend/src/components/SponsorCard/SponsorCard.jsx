const SponsorCard = ({ obj }) => {
  const { title, imageUrl, address, workDays, phone, email } = obj;

  const workTime = workDays
    ? workDays.reduce((acc, el, index, array) => {
        let day = '';

        switch (index) {
          case 0:
            day = 'mon';
            break;
          case 1:
            day = 'tue';
            break;
          case 2:
            day = 'wed';
            break;
          case 3:
            day = 'thu';
            break;
          case 4:
            day = 'fri';
            break;
          case 5:
            day = 'sat';
            break;
          case 6:
            day = 'sun';
            break;

          default:
            break;
        }

        if (!el.isOpen) {
          return { ...acc, [day]: 'Closed' };
        }

        return { ...acc, [day]: `${el.from} - ${el.to}` };
      }, {})
    : {};

  return (
    <>
      <img src={imageUrl} alt="logo" />
      <h3>{title}</h3>
      <ul>
        <li>
          <h4>Time:</h4>
          <p>
            {workDays
              ? Object.values(workTime).find(el => el !== 'Closed')
              : '----'}
          </p>
        </li>
        <li>
          <h4>Adress:</h4>
          <p>{address ? address : '----'}</p>
        </li>
        <li>
          <h4>Email:</h4>
          <p>{email ? email : '-----'}</p>
        </li>
        <li>
          <h4>Phone:</h4>
          <p>{phone ? phone : '----'}</p>
        </li>
      </ul>
    </>
  );
};

export default SponsorCard;
