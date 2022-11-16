import { useState } from 'react';
import Button from '../button/button';
import UserPhoto from '../../images/userDog.png';
import LogOut from '../LogOut';
import scss from './UserData.module.scss';

const UserData = props => {
  const [name, setName] = useState('Anna');
  const [email, setEmail] = useState('anna@gmail.com');
  const [birthday, setBirthday] = useState('0000.00.00');
  const [phone, setPhone] = useState('+380998877666');
  const [city, setCity] = useState('Kyiv');

  const [inputFieldActive, setInputFieldActive] = useState(false);

  const [changeIcon, setChangeIcon] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const changeBlur = () => {
    // setDisabled(true);
    setChangeIcon(false);
    setInputFieldActive(false);
  };
  const btnClick = () => {
    setInputFieldActive(true);
    setChangeIcon(true);
  };

  const editPhoto = () => {
    console.log('Edit photo'); // change user avatar
  };
  const handleChange = event => {
    switch (event.target.id) {
      case 'name':
        setName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'birthday':
        setBirthday(event.target.value);
        break;
      case 'phone':
        setPhone(event.target.value);
        break;
      case 'city':
        setCity(event.target.value);
        break;

      default:
        return;
    }
  };
  return (
    <div className={scss.wrapper}>
      <img
        src={UserPhoto}
        alt="user avatar"
        className={scss.userImg}
        width={233}
        height={233}
      />
      <Button
        name="image"
        type="file"
        onClick={editPhoto}
        className={scss.btnEditPhoto}
      >
        <p className={scss.editPhoto}>Edit photo</p>
      </Button>

      <div className={scss.userInfo}>
        <ul className={scss.list}>
          <li className={scss.listItem}>
            <label for="name" className={scss.listText}>
              Name:
            </label>
            <input
              className={
                !inputFieldActive ? scss.inputField : scss.inputFieldActive
              }
              type="text"
              onChange={handleChange}
              onBlur={changeBlur}
              value={name}
              id="name"
              name="name"
            />
            <Button
              type="submit"
              className={!changeIcon ? scss.btnEdit : scss.btnEditActive}
              onClick={btnClick}
            ></Button>
          </li>
          <li className={scss.listItem}>
            <label for="email" className={scss.listText}>
              Email:{' '}
            </label>

            <input
              className={
                !inputFieldActive ? scss.inputField : scss.inputFieldActive
              }
              type="text"
              id="email"
              onChange={handleChange}
              onBlur={changeBlur}
              name={email}
              value={email}
            />
            <Button
              className={!changeIcon ? scss.btnEdit : scss.btnEditActive}
              onClick={btnClick}
            ></Button>
          </li>
          <li className={scss.listItem}>
            <label for="birthday" className={scss.listText}>
              Birthday:
            </label>
            <input
              className={
                !inputFieldActive ? scss.inputField : scss.inputFieldActive
              }
              type="text"
              id="birthday"
              onChange={handleChange}
              onBlur={changeBlur}
              name={birthday}
              value={birthday}
            />
            <Button
              className={!changeIcon ? scss.btnEdit : scss.btnEditActive}
              onClick={btnClick}
            ></Button>
          </li>
          <li className={scss.listItem}>
            <label for="phone" className={scss.listText}>
              Phone:
            </label>
            <input
              className={
                !inputFieldActive ? scss.inputField : scss.inputFieldActive
              }
              type="text"
              id="phone"
              onChange={handleChange}
              onBlur={changeBlur}
              name={phone}
              value={phone}
            />
            <Button
              className={!changeIcon ? scss.btnEdit : scss.btnEditActive}
              onClick={btnClick}
            ></Button>
          </li>
          <li className={scss.listItem}>
            <label for="city" className={scss.listText}>
              City:
            </label>
            <input
              className={
                !inputFieldActive ? scss.inputField : scss.inputFieldActive
              }
              type="text"
              id="city"
              onChange={handleChange}
              onBlur={changeBlur}
              name={city}
              value={city}
            />
            <Button
              className={!changeIcon ? scss.btnEdit : scss.btnEditActive}
              onClick={btnClick}
            ></Button>
          </li>
        </ul>
        <LogOut />
      </div>
    </div>
  );
};

export default UserData;
