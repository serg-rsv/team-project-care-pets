import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import { Loader } from './components/Loader/Loader';
import toastOptions from './helpers/toastOptions';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route element={<PublicRoute restricted />}>
            <Route
              path="/register"
              element={
                <Suspense fallback={<Loader />}>
                  <RegisterPage />
                </Suspense>
              }
            />
          </Route>
          <Route element={<PublicRoute restricted />}>
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loader />}>
                  <LoginPage />
                </Suspense>
              }
            />
          </Route>
          <Route element={<PublicRoute />}>
            <Route
              path="/friends"
              element={
                <Suspense fallback={<Loader />}>
                  <OurFriendsPage />
                </Suspense>
              }
            />
          </Route>
          <Route element={<PublicRoute />}>
            <Route
              path="/news"
              element={
                <Suspense fallback={<Loader />}>
                  <NewsPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/notices"
            element={
              <Suspense fallback={<Loader />}>
                <NoticesPage />
              </Suspense>
            }
          >
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
            <Route
              path="/user"
              element={
                <Suspense fallback={<Loader />}>
                  <UserPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <ToastContainer {...toastOptions} />
    </>
  );
}

export default App;
