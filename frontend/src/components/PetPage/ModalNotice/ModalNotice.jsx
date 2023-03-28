// import PropTypes from 'prop-types';
import s from './ModalNotice.module.scss';

const ModalNotice = ({
  category,
  photoURL,
  name,
  title,
  birthday,
  breed,
  location,
  sex,
  comments,
  email,
  phone,
  price,
}) => {
  const checkCategory = category === 'sell';
  return (
    <div>
      <div className={s.boxData}>
        <div className={s.imgBox}>
          <div className={s.signature}>
            <p className={s.signatureText}>{category}</p>
          </div>
          <div className={s.imgWrapper}>
            <img className={s.noticePhoto} src={photoURL} alt={title} />
          </div>
        </div>
        <div className={s.listWrapper}>
          <h1 className={s.title}>{title}</h1>
          <ul className={s.listParams}>
            <li className={s.listItem}>
              <dd className={s.listItemLabel}>Ім'я:</dd>
              <dt className={s.listText}>{name}</dt>
            </li>
            <li className={s.listItem}>
              <dd className={s.listItemLabel}>Вік:</dd>
              <dt className={s.listText}>{birthday}</dt>
            </li>
            <li className={s.listItem}>
              <dd className={s.listItemLabel}>Порода:</dd>
              <dt className={s.listText}>{breed}</dt>
            </li>
            <li className={s.listItem}>
              <dd className={s.listItemLabel}>Місце:</dd>
              <dt className={s.listText}>{location}</dt>
            </li>
            <li className={s.listItem}>
              <dd className={s.listItemLabel}>Стать:</dd>
              <dt className={s.listText}>{sex}</dt>
            </li>
            <li className={s.listItem}>
              <dd className={s.listItemLabel}>Email:</dd>
              <dt className={s.listText}>{email}</dt>
            </li>
            <li className={s.listItem}>
              <dd className={s.listItemLabel}>Телефон:</dd>
              <dt className={s.listText}>{phone}</dt>
            </li>
            {checkCategory && (
              <li className={s.listItem}>
                <dd className={s.listItemLabel}>Ціна:</dd>
                <dt className={s.listText}>{`${price}₴`}</dt>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className={s.comments}>
        <dd className={s.listItemLabel}>Коментарі:</dd>
        <dt className={s.listText}>{comments}</dt>
      </div>
    </div>
  );
};

// ModalNotice.propTypes = {
//   category: PropTypes.string.isRequired,
//   photoURL: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   birthday: PropTypes.string.isRequired,
//   breed: PropTypes.string.isRequired,
//   location: PropTypes.string.isRequired,
//   sex: PropTypes.string.isRequired,
//   comments: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
//   price: PropTypes.string.isRequired,
// };

export default ModalNotice;
