import { useState, useRef, useEffect } from 'react';
import UserButton from '../UserButton';
import LogOut from '../LogOut';
import scss from './UserData.module.scss';
import {
  useCurrentQuery,
  useAvatarsMutation,
  useEditMutation,
} from '../../redux/services/usersSlice';

const UserData = () => {
  const [nameUser, setNameUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [birthdayUser, setBirthdayUser] = useState('1989-04-10');
  const [phoneUser, setPhoneUser] = useState('');
  const [locationUser, setLocationUser] = useState('');
  const [photoUser, setPhotoUser] = useState('');

  const { data } = useCurrentQuery();
  const [avatars] = useAvatarsMutation();
  const [edit] = useEditMutation();

  const nameRef = useRef(nameUser);
  const emailRef = useRef(emailUser);
  const birthdayRef = useRef(birthdayUser);
  const phoneRef = useRef(phoneUser);
  const locationRef = useRef(locationUser);

  useEffect(() => {
    const getData = async () => {
      if (data?.user) {
        const { name, email, birthday, phone, location, photoURL } = data.user;
        setNameUser(name);
        setEmailUser(email);
        setBirthdayUser(birthday.toString().slice(0, 10));
        setPhoneUser(phone);
        setLocationUser(location);
        setPhotoUser(photoURL);
        return;
      }
    };
    getData();
  }, [data]);

  function isFieldChanged() {
    const changed =
      nameRef.current !== nameUser ||
      emailRef.current !== emailUser ||
      birthdayRef.current !== birthdayUser ||
      phoneRef.current !== phoneUser ||
      locationRef.current !== locationUser;

    if (changed) {
      nameRef.current = nameUser;
      emailRef.current = emailUser;
      birthdayRef.current = birthdayUser;
      phoneRef.current = phoneUser;
      locationRef.current = locationUser;
    }

    return changed;
  }

  const editField = async dataForEdit => {
    await edit(dataForEdit);
  };

  const disabledButton = (boolean = false) => {
    document.querySelectorAll('button[data-active="false"]').forEach(el => {
      el.disabled = boolean;
    });
  };

  const btnClick = async event => {
    const button = event.target;
    const input = event.target.parentNode.querySelector('input');

    const status = button.dataset.active;
    input.classList.toggle(scss.inputFieldActive);

    if (status === 'false') {
      button.dataset.active = 'true';

      disabledButton(true);

      input.disabled = false;
      input.focus();
      return;
    }
    if (status === 'true') {
      button.dataset.active = 'false';

      disabledButton();

      input.disabled = true;
      if (isFieldChanged()) {
        const obj = {};
        obj[input.name] = input.value;
        editField(obj);
      }
      return;
    }
  };

  const editAvatar = async e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const {
      data: { photoURL },
    } = await avatars(formData);
    setPhotoUser(photoURL);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    const buttonSubmit = event.target.nextSibling;

    buttonSubmit.disabled = !event.target.validity.valid;
    switch (name) {
      case 'name':
        setNameUser(value);
        break;
      case 'email':
        setEmailUser(value);
        break;
      case 'birthday':
        setBirthdayUser(value);
        break;
      case 'phone':
        setPhoneUser(value);
        break;
      case 'location':
        setLocationUser(value);
        break;

      default:
        return;
    }
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.userImageWrapper}>
        {photoUser && (
          <img src={photoUser} alt="user avatar" className={scss.userImg} />
        )}
      </div>
      <label className={scss.btnEditPhoto}>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          name="image"
          style={{ display: 'none' }}
          onChange={editAvatar}
        />
        <p className={scss.editPhoto}>???????????????????? ????????</p>
      </label>

      <div className={scss.userInfo}>
        <ul className={scss.list}>
          <li className={scss.listItem}>
            <label htmlFor="name" className={scss.listText}>
              ????'??:
            </label>
            <div className={scss.inputWrapper}>
              <input
                className={scss.inputField}
                type="text"
                onChange={handleChange}
                value={nameUser}
                name="name"
                disabled
                minLength={2}
                required
                autoComplete="off"
                onSubmit={btnClick}
                pattern="^^[??-????-??????????????a-zA-Z]+ ?([??-????-??????????????a-zA-Z]+)?$"
                title="???????? ?????? ???????????????????? ???????? ?? ?????????? ????, ???? ????????????????????????, ??????????????, ???????????????????? ?????????????????? ?????????? 2"
              />
              <UserButton dataActive={false} onClick={btnClick}></UserButton>
            </div>
          </li>
          <li className={scss.listItem}>
            <label htmlFor="email" className={scss.listText}>
              Email:{' '}
            </label>

            <div className={scss.inputWrapper}>
              <input
                className={scss.inputField}
                type="text"
                onChange={handleChange}
                autoComplete="off"
                name="email"
                value={emailUser}
                disabled
                required
                pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$"
                title="???????????????????????? ???????????????? ??????????"
              />
              <UserButton dataActive={false} onClick={btnClick}></UserButton>
            </div>
          </li>
          <li className={scss.listItem}>
            <label htmlFor="birthday" className={scss.listText}>
              ???????? ????????????????????:
            </label>
            <div className={scss.inputWrapper}>
              <input
                className={scss.inputField}
                type="date"
                onChange={handleChange}
                name="birthday"
                value={birthdayUser}
                disabled
                required
                max={new Date().toISOString().split('T')[0]}
                title="???????? ?????? ???????? ?? ????????????????"
              />
              <UserButton dataActive={false} onClick={btnClick}></UserButton>
            </div>
          </li>
          <li className={scss.listItem}>
            <label htmlFor="phone" className={scss.listText}>
              ??????????????:
            </label>
            <div className={scss.inputWrapper}>
              <input
                className={scss.inputField}
                type="text"
                onChange={handleChange}
                name="phone"
                value={phoneUser}
                disabled
                required
                pattern="^\+380\d{9}$"
                title="?????????????? ?????????? ?? ?????????????? +380*******"
              />
              <UserButton dataActive={false} onClick={btnClick}></UserButton>
            </div>
          </li>
          <li className={scss.listItem}>
            <label htmlFor="city" className={scss.listText}>
              ??????????:
            </label>
            <div className={scss.inputWrapper}>
              <input
                className={scss.inputField}
                type="text"
                onChange={handleChange}
                name="location"
                value={locationUser}
                disabled
                required
                pattern="[??-????-??????????????a-zA-Z]{2,},? ([??-????-??????????????a-zA-Z]+(?: [??-????-??????????????a-zA-Z]+)*)+$"
                title="?????????????? ?? ??????????????: ??????????, ??????????????"
              />
              <UserButton dataActive={false} onClick={btnClick}></UserButton>
            </div>
          </li>
        </ul>
        <LogOut />
      </div>
    </div>
  );
};

export default UserData;
