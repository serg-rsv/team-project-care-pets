import Button from '../Button';
import scss from './LoadMore.module.scss';
const LoadMore = ({ loadMore, disabled }) => {
  return (
    <>
      <Button
        className={scss.loadMoreBtn}
        onClick={loadMore}
        disabled={disabled}
      >
        Загрузити ще
      </Button>
    </>
  );
};
export default LoadMore;
