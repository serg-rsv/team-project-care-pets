// import Scroll from 'react-scroll';
import { useEffect, useState } from 'react';

import { useGetFavoritesNoticeQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';

// import LoadMore from '../../../LoadMore';

const Favorite = () => {
  const isActiveDelete = false;
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const { data: notices } = useGetFavoritesNoticeQuery({ page, limit: 4 });
  const { data: user } = useCurrentQuery();

  // const scroll = Scroll.animateScroll;

  const markedNotices = markFavoriteNotice(
    notices?.data,
    user?.user?.favorites
  );

  useEffect(() => {
    setPets(markedNotices);
  }, [notices, user]);

  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
      {/* {notices?.data?.length ? <LoadMore loadMore={() => loadMore()} /> : null} */}
    </>
  );
};

export default Favorite;
