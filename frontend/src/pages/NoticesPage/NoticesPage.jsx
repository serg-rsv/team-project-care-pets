import { Outlet } from 'react-router-dom';

import NoticesSearch from '../../components/PetPage/NoticesSearch';

import NoticesCategoriesNav from '../../components/PetPage/NoticesCategoriesNav';

import Container from '../../components/PetPage/NoticesCategoriesNav/Container';

// import s from './NoticesPage.module.scss';
// при першому ренедрі відмалювати SELL через useEffect
const NoticesPage = () => {
  return (
    <div className="container">
      <NoticesSearch />
      <Container>
        <NoticesCategoriesNav />
        <Outlet />
      </Container>
    </div>
  );
};

export default NoticesPage;
