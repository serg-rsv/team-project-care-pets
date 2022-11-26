import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import { Loader } from './components/Loader/Loader';
import toastOptions from './helpers/toastOptions';

const SharedLayout = lazy(() => import('./components/SharedLayout'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const OurFriendsPage = lazy(() => import('./pages/OurFriendsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const LostFound = lazy(() =>
  import('./components/PetPage/NoticesCategoriesNav/LostFound')
);
const InGoodHands = lazy(() =>
  import('./components/PetPage/NoticesCategoriesNav/InGoodHands')
);
const Sell = lazy(() =>
  import('./components/PetPage/NoticesCategoriesNav/Sell')
);
const Favorite = lazy(() =>
  import('./components/PetPage/NoticesCategoriesNav/Favorite')
);
const Own = lazy(() => import('./components/PetPage/NoticesCategoriesNav/Own'));
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

          <Route
            path="/notices"
            element={
              <Suspense fallback={<Loader />}>
                <NoticesPage />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <Sell />
                </Suspense>
              }
            />
            <Route
              path="sell"
              element={
                <Suspense fallback={<Loader />}>
                  <Sell />
                </Suspense>
              }
            />
            <Route
              path="lost-found"
              element={
                <Suspense fallback={<Loader />}>
                  <LostFound />
                </Suspense>
              }
            />
            <Route
              path="for-free"
              element={
                <Suspense fallback={<Loader />}>
                  <InGoodHands />
                </Suspense>
              }
            />
            <Route element={<PrivateRoute />}>
              <Route
                path="favorite"
                element={
                  <Suspense fallback={<Loader />}>
                    <Favorite />
                  </Suspense>
                }
              />
              <Route
                path="own"
                element={
                  <Suspense fallback={<Loader />}>
                    <Own />
                  </Suspense>
                }
              />
            </Route>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<UserPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer {...toastOptions} />
    </Suspense>
  );
}

export default App;
