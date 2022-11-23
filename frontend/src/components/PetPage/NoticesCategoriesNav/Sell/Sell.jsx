import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotices } from '../../../../redux/noticesSlice';
import { selectNotices } from '../../../../redux/selectors';

import { useGetNoticesByCategoryQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';
import LoadMore from '../../../LoadMore';

const Sell = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const pets = useSelector(selectNotices);

  const isActiveDelete = false;
  const { data: noticesCategory } = useGetNoticesByCategoryQuery({
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
    //     // const markedNotices = markFavoriteNotice(
    //     //   noticesCategory?.data,
    //     //   user?.user?.favorites
    //     // );
    dispatch(setNotices(markedNotices));
  }, [dispatch, noticesCategory, user?.user?.favorites]);

  const loadMore = () => {
    setPage(page + 1);
    dispatch(setNotices(pets.concat(markedNotices)));
  };
  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
      {noticesCategory?.data?.length ? (
        <LoadMore loadMore={() => loadMore()}>Load more</LoadMore>
      ) : null}
    </>
  );
};

export default Sell;
