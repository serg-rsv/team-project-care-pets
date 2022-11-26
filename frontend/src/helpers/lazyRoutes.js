import { lazy } from 'react';

export const SharedLayout = lazy(() => import('../components/SharedLayout'));
export const RegisterPage = lazy(() => import('../pages/RegisterPage'));
export const LoginPage = lazy(() => import('../pages/LoginPage'));
export const NewsPage = lazy(() => import('../pages/NewsPage'));
export const OurFriendsPage = lazy(() => import('../pages/OurFriendsPage'));
export const NoticesPage = lazy(() => import('../pages/NoticesPage'));
export const UserPage = lazy(() => import('../pages/UserPage'));
export const HomePage = lazy(() => import('../pages/HomePage'));
export const NotFound = lazy(() => import('../pages/NotFound'));
export const Category = lazy(() =>
  import('../components/PetPage/NoticesCategoriesNav/Category')
);
export const Favorite = lazy(() =>
  import('../components/PetPage/NoticesCategoriesNav/Favorite')
);
export const Own = lazy(() =>
  import('../components/PetPage/NoticesCategoriesNav/Own')
);
