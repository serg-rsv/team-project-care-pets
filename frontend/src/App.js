import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import { Loader } from './components/Loader/Loader';
import toastOptions from './helpers/toastOptions';
import {
  SharedLayout,
  HomePage,
  RegisterPage,
  LoginPage,
  OurFriendsPage,
  NewsPage,
  NoticesPage,
  Favorite,
  Own,
  Sell,
  InGoodHands,
  LostFound,
  UserPage,
  NotFound,
} from './helpers/lazyRoutes';

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

          <Route path="/notices" element={<NoticesPage />}>
            <Route index element={<Sell />} />

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
