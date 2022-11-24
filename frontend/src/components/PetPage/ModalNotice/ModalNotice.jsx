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
        <div>
          <div className={s.signature}>
            <p>{category}</p>
          </div>
          <img src={photoURL} alt={title} />
        </div>
        <div>
          <h1 className={s.title}>{title}</h1>
          <ul className={s.listParams}>
            <li>
              <p className={s.name}>Name:</p>
              <p>{name}</p>
            </li>
            <li>
              <p className={s.birthday}>Birthday:</p>
              <p>{birthday}</p>
            </li>
            <li>
              <p className={s.breed}>Breed:</p>
              <p>{breed}</p>
            </li>
            <li>
              <p className={s.place}>Place:</p>
              <p>{location}</p>
            </li>
            <li>
              <p className={s.sex}>The sex:</p>
              <p>{sex}</p>
            </li>
            <li>
              <p className={s.email}>Email:</p>
              <p>{email}</p>
            </li>
            <li>
              <p className={s.phone}>Phone:</p>
              <p>{phone}</p>
            </li>
            {checkCategory && (
              <li>
                <p className={s.sell}>Sell:</p>
                <p>{`${price}$`}</p>
              </li>
            )}
          </ul>
        </div>
      </div>

      <p className={s.comments}>{comments}</p>
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
