import { useTranslation } from 'react-i18next';

import Button from '../Button';
import scss from './LoadMore.module.scss';

const LoadMore = ({ loadMore, disabled }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Button
        className={scss.loadMoreBtn}
        onClick={loadMore}
        disabled={disabled}
      >
        {t('LoadMore.loadMore')}
      </Button>
    </>
  );
};
export default LoadMore;
