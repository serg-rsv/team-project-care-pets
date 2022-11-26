import Scroll from 'react-scroll';
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
  const { data: user } = useCurrentQuery();

  const scroll = Scroll.animateScroll;

  const isActiveDelete = false;
  const { data: noticesCategory } = useGetNoticesByCategoryQuery({
    category: 'lost-found',
    page,
    limit: 4,
  });

  const markedNotices = markFavoriteNotice(
    noticesCategory?.data,
    user?.user?.favorites
  );

  useEffect(() => {
    dispatch(setNotices(pets.concat(markedNotices)));
    if (page !== 1) {
      scroll.scrollToBottom({ duration: 1000 });
    }
  }, [noticesCategory]);

  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
      {noticesCategory?.data.length ? (
        <LoadMore loadMore={() => setPage(page + 1)} />
      ) : null}
    </>
  );
};

export default LostFound;
