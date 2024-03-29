import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Scroll from 'react-scroll';

import { selectNotices, selectIsLoadMore } from '../../../../redux/selectors';
import { setNotices } from '../../../../redux/noticesSlice';
import { useGetNoticesByCategoryQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';
import NoticesCategoriesList from '../../NoticesCategoriesList';
import LoadMore from '../../../LoadMore';
import { Loader } from '../../../Loader/Loader';

const Sell = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const pets = useSelector(selectNotices);
  const isLoadMore = useSelector(selectIsLoadMore);
  const scroll = Scroll.animateScroll;
  const isActiveDelete = false;
  const { data: noticesCategory, isFetching } = useGetNoticesByCategoryQuery({
    category: 'sell',
    page,
    limit: 4,
  });
  const { data: user } = useCurrentQuery();
  const markedNotices = markFavoriteNotice(
    noticesCategory?.data,
    user?.user?.favorites
  );

  useEffect(() => {
    dispatch(setNotices(pets.concat(markedNotices)));
    if (page !== 1) {
      scroll.scrollToBottom({ duration: 1000 });
    }
    return () => dispatch(setNotices([]));
  }, [noticesCategory]);

  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
      {isLoadMore && page < noticesCategory?.totalPages ? (
        <LoadMore loadMore={() => setPage(page + 1)} disabled={isFetching} />
      ) : (
        <div style={{ visibility: 'hidden', height: '44px' }} />
      )}
      {isFetching && (
        <div className="loaderWrapper">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Sell;
