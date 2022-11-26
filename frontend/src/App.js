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

            <Route path="sell" element={<Sell />} />
            <Route path="lost-found" element={<LostFound />} />
            <Route path="for-free" element={<InGoodHands />} />
            <Route element={<PrivateRoute />}>
              <Route path="favorite" element={<Favorite />} />
              <Route path="own" element={<Own />} />
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
