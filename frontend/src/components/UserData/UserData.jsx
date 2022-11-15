import Button from '../button/button';
import UserPhoto from '../../images/userDog.png';
import LogOut from '../LogOut';
import scss from './UserData.module.scss';
const UserData = props => {
  const editPhoto = () => {
    console.log('Edit photo'); // change user avatar
  };

  const editField = () => {
    console.log('Edit Field');
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
            <p className={scss.listText}>Name:</p>
            <input className={scss.inputField} type="text" value="Anna" />
            <Button className={scss.btnEdit} onClick={editField}></Button>
          </li>
          <li className={scss.listItem}>
            <p className={scss.listText}>Email: </p>
            <input
              className={scss.inputField}
              type="text"
              value="anna00@gmail.com"
            />
            <Button className={scss.btnEdit} onClick={editField}></Button>
          </li>
          <li className={scss.listItem}>
            <p className={scss.listText}>Birthday:</p>
            <input className={scss.inputField} type="text" value={8000000000} />
            <Button className={scss.btnEdit} onClick={editField}></Button>
          </li>
          <li className={scss.listItem}>
            <p className={scss.listText}>Phone:</p>
            <input
              className={scss.inputField}
              type="text"
              value={+38000000000}
            />
            <Button className={scss.btnEdit} onClick={editField}></Button>
          </li>
          <li className={scss.listItem}>
            <p className={scss.listText}>City:</p>
            <input className={scss.inputField} type="text" value="Kyiv" />
            <Button className={scss.btnEdit} onClick={editField}></Button>
          </li>
        </ul>
        <LogOut />
      </div>
    </div>
  );
};

export default UserData;
