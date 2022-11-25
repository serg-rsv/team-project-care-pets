import PropTypes from 'prop-types';
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
    <div className={s.box}>
      <div className={s.boxData}>
        <div className={s.imgBox}>
          <div className={s.signature}>
            <p className={s.signatureText}>{category}</p>
          </div>
          <img src={photoURL} alt={title} />
        </div>
        <div>
          <h1 className={s.title}>{title}</h1>
          <ul className={s.listParams}>
            <li className={s.listItem}>
              Name:
              <p className={s.listText}>{name}</p>
            </li>
            <li className={s.listItem}>
              Birthday:
              <p className={s.listText}>{birthday}</p>
            </li>
            <li className={s.listItem}>
              Breed:
              <p className={s.listText}>{breed}</p>
            </li>
            <li className={s.listItem}>
              Place:
              <p className={s.listText}>{location}</p>
            </li>
            <li className={s.listItem}>
              The sex:
              <p className={s.listText}>{sex}</p>
            </li>
            <li className={s.listItem}>
              Email:
              <p className={s.listText}>{email}</p>
            </li>
            <li className={s.listItem}>
              Phone:
              <p className={s.listText}>{phone}</p>
            </li>
            {checkCategory && (
              <li className={s.listItem}>
                Sell:
                <p className={s.listText}>{`${price}$`}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className={s.comments}>
        Comments:
        <p className={s.textComment}>{comments}</p>
      </div>
    </div>
  );
};

ModalNotice.propTypes = {
  category: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ModalNotice;
