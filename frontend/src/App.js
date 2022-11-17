// import { lazy, Suspense } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import PrivateRoute from './components/Routes/PrivateRoute';
// import PublicRoute from './components/Routes/PublicRoute';
// import { Loader } from './components/Loader/Loader';

// const SharedLayout = lazy(() => import('./components/SharedLayout'));
// const RegisterPage = lazy(() => import('./pages/RegisterPage'));
// const LoginPage = lazy(() => import('./pages/LoginPage'));
// const NewsPage = lazy(() => import('./pages/NewsPage'));
// const OurFriendsPage = lazy(() => import('./pages/OurFriendsPage'));
// const NoticesPage = lazy(() => import('./pages/NoticesPage'));
// const UserPage = lazy(() => import('./pages/UserPage'));
// const HomePage = lazy(() => import('./pages/HomePage'));
// const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
import ModalAddPet from "./components/ModalAddPet";

function App() {
  return (
    // 
    <ModalAddPet/>
  );
}

export default App;
