import { Routes, Route } from 'react-router-dom';

import NoticesSearch from '../../components/PetPage/NoticesSearch';

import NoticesCategoriesNav from '../../components/PetPage/NoticesCategoriesNav';

import Container from '../../components/PetPage/NoticesCategoriesNav/Container';
import LostFound from '../../components/PetPage/NoticesCategoriesNav/LostFound';
import InGoodHands from '../../components/PetPage/NoticesCategoriesNav/InGoodHands';
import Sell from '../../components/PetPage/NoticesCategoriesNav/Sell';
import Favorite from '../../components/PetPage/NoticesCategoriesNav/Favorite';
import Own from '../../components/PetPage/NoticesCategoriesNav/Own';

// import s from './NoticesPage.module.scss';
// при першому ренедрі відмалювати SELL через useEffect
const NoticesPage = () => {
  return (
    <div className="container">
      <NoticesSearch />
      <Container>
        <NoticesCategoriesNav /> 
      
        {/* <Routes>
          <Route path="/notices/lost-found" element={<LostFound />} />
          <Route path="/notices/for-free" element={<InGoodHands />} />
          <Route path="/notices/sell" element={<Sell />} />
          <Route path="/notices/favorite" element={<Favorite />} />
          <Route path="/notices/own" element={<Own />} />
        </Routes> */}
      </Container>
    </div>
  );
};

export default NoticesPage;
