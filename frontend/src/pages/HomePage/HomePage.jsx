import s from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={s.homePage}>
      <section className="container">
        <h1 className={s.mainTitle}>Піклуйтеся про своїх пухнастих друзів</h1>
      </section>
    </div>
  );
};

export default HomePage;
