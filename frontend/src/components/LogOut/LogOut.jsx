import Button from '../Button/Button';
import scss from './LogOut.module.scss';
const LogOut = () => {
  const logOut = () => {
    console.log('Log out'); // вихід з облікового запису
  };
  return (
    <Button onClick={logOut} className={scss.logOutBtn}>
      <p className={scss.logOutText}>Log Out</p>
    </Button>
  );
};

export default LogOut;
