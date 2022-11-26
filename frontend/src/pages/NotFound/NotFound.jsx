import wonderWError from '../../images/wonderW.svg';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <section className={styles.section}>
      <div className={['container', styles.wrapper].join(' ')}>
        <h2 className="visually-hidden">Page not found</h2>
        <img
          className={styles.panda}
          src={wonderWError}
          alt="Wonder Worker customed error page"
        />
      </div>
    </section>
  );
};

export default NotFound;
