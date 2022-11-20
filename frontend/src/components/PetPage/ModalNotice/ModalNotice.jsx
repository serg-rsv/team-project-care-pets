import s from './ModalNotice.module.scss';

const ModalNotice = () => {
  return (
    <div className={s.box}>
      <div className={s.boxData}>
        <div>
          <div className={s.signature}>
            <p>In good hands</p>
          </div>
          <img
            src="https://static9.depositphotos.com/1632087/1139/i/600/depositphotos_11395540-stock-photo-black-yellow.jpg"
            alt="cat"
          />
        </div>
        <div>
          <h1 className={s.title}>Сute dog looking for a home</h1>
          <ul className={s.listParams}>
            <li>
              <p className={s.name}>Name:</p>
              <p>Rich</p>
            </li>
            <li>
              <p className={s.birthday}>Birthday:</p>
              <p>R21.09.2020</p>
            </li>
            <li>
              <p className={s.breed}>Breed:</p>
              <p>Pomeranian</p>
            </li>
            <li>
              <p className={s.place}>Place:</p>
              <p>Lviv</p>
            </li>
            <li>
              <p className={s.sex}>The sex:</p>
              <p>male</p>
            </li>
            <li>
              <p className={s.email}>Email:</p>
              <p>user@mail.com</p>
            </li>
            <li>
              <p className={s.phone}>Phone:</p>
              <p>+380971234567</p>
            </li>
          </ul>
        </div>
      </div>

      <p className={s.comments}>
        Comments: Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit
        amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem
      </p>
    </div>
  );
};

export default ModalNotice;
