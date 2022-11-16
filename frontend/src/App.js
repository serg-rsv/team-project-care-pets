import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import { Loader } from './components/Loader/Loader';

const Header = lazy(() => import('./components/Header')); // Хедер потрібно поміняти на Sharedlayout
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const OurFriendsPage = lazy(() => import('./pages/OurFriendsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage'));
const UserPage = lazy(() => import('./pages/UserPage'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route element={<PublicRoute restricted />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<PublicRoute restricted />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/friend" element={<OurFriendsPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/news" element={<NewsPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/notices/:categoryName" element={<NoticesPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
