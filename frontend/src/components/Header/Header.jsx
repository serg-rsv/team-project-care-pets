import Logo from '../Logo/Logo';
import Navigation from '../Navigation';
import s from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <div className={['container', s.content].join(' ')}>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
