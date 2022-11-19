import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import { Loader } from './components/Loader/Loader';


const SharedLayout = lazy(() => import('./components/SharedLayout'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const OurFriendsPage = lazy(() => import('./pages/OurFriendsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const LostFound = lazy(() => import('./components/PetPage/NoticesCategoriesNav/LostFound'));
const InGoodHands = lazy(() => import('./components/PetPage/NoticesCategoriesNav/InGoodHands'));
const Sell = lazy(() => import('./components/PetPage/NoticesCategoriesNav/Sell'));
const Favorite = lazy(() => import('./components/PetPage/NoticesCategoriesNav/Favorite'));
const Own = lazy(() => import('./components/PetPage/NoticesCategoriesNav/Own'));

const NoticesCategoriesList = lazy(() =>
  import('./components/PetPage/NoticeCategoryItem')
);



function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route element={<PublicRoute restricted />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<PublicRoute restricted />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/friends" element={<OurFriendsPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/news" element={<NewsPage />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/notices" element={<NoticesPage />}>
              <Route path="lost-found" element={<LostFound />} />
              <Route path="for-free" element={<InGoodHands />} />
              <Route path="sell" element={<Sell />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/notices" element={<NoticesPage />}>
              <Route path="favorite" element={<Favorite />} />
              <Route path="own" element={<Own />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    
  );
}

export default App;
