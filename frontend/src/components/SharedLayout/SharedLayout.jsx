import { Outlet } from 'react-router-dom';

import Header from '../Header';
import s from './SharedLayout.module.scss';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SharedLayout;
