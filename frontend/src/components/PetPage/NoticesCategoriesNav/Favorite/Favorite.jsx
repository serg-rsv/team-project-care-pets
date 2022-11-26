import Scroll from 'react-scroll';
import { useEffect, useState } from 'react';

import { useGetFavoritesNoticeQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';
import LoadMore from '../../../LoadMore';
const Favorite = () => {
  const isActiveDelete = false;
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const { data: notices } = useGetFavoritesNoticeQuery({ page, limit: 4 });
  const { data: user } = useCurrentQuery();
  const markedNotices = markFavoriteNotice(
    notices?.data,
    user?.user?.favorites
  );
  const scroll = Scroll.animateScroll;
  useEffect(() => {
    setPets(markedNotices);
  }, [notices, user]);

  const loadMore = () => {
    setPage(page + 1);
    setPets(pets.concat(markedNotices));
    scroll.scrollToBottom({ duration: 1000 });
  };
  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
      {notices?.page !== notices?.totalPages && notices?.totalPages !== 0 ? (
        <LoadMore loadMore={() => loadMore()} />
      ) : null}
    </>
  );
};

export default Favorite;
