import Button from '../Button';
import scss from './LoadMore.module.scss';
const LoadMore = ({ loadMore }) => {
  return (
    <>
      <Button className={scss.loadMoreBtn} onClick={loadMore}>
        Загрузити ще
      </Button>
    </>
  );
};
export default LoadMore;
