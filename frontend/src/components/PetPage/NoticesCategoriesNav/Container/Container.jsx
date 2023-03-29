import s from './Container.module.scss';

const Container = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
