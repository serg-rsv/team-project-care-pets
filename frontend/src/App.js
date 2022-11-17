import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import { Loader } from './components/Loader/Loader';
import SharedLayout from './components/SharedLayout/SharedLayout';
import HomePage from './pages/HomePage';
import OurFriendsPage from './pages/OurFriendsPage';

function App() {
  return (
    // <Suspense fallback={<Loader />}>
    //   <Routes>
    //     <Route path="/" element={<SharedLayout />}>
    //       <Route element={<PublicRoute restricted />}>
    //         <Route path="/register" element={<RegisterPage />} />
    //       </Route>
    //       <Route element={<PublicRoute restricted />}>
    //         <Route path="/login" element={<LoginPage />} />
    //       </Route>
    //       <Route element={<PublicRoute />}>
    //         <Route path="friend" element={<OurFriendsPage />} />
    //       </Route>
    //       <Route element={<PublicRoute />}>
    //         <Route path="/news" element={<NewsPage />} />
    //       </Route>
    //       <Route element={<PublicRoute />}>
    //         <Route path="/notices/:categoryName" element={<NoticesPage />} />
    //       </Route>
    //       <Route element={<PrivateRoute />}>
    //         <Route path="/user" element={<UserPage />} />
    //       </Route>
    //     </Route>
    //   </Routes>
    // </Suspense>
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="friend" element={<OurFriendsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
