import s from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={s.homePage}>
      <section className="container">
        <h1 className={s.mainTitle}>Take good care of your small pets</h1>
      </section>
    </div>
  );
};

export default HomePage;
