import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotices } from '../../../../redux/noticesSlice';
import { selectNotices } from '../../../../redux/selectors';

import { useGetNoticesByCategoryQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';
import LoadMore from '../../../LoadMore';
const LostFound = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const pets = useSelector(selectNotices);

  const isActiveDelete = false;
  const { data: noticesCategory } = useGetNoticesByCategoryQuery({
    category: 'lost-found',
    page,
    limit: 4,
  });
  const { data: user } = useCurrentQuery();
  const markedNotices = markFavoriteNotice(
    noticesCategory?.data,
    user?.user?.favorites
  );
  useEffect(() => {
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
      {noticesCategory?.page !== noticesCategory?.totalPages &&
      noticesCategory?.totalPages !== 0 ? (
        <LoadMore loadMore={() => loadMore()} />
      ) : null}
    </>
  );
};

export default LostFound;
