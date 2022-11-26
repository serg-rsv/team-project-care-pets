// import Scroll from 'react-scroll';
import { useEffect, useState } from 'react';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';
import { useGetPersonalNoticeQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';

import NoticesCategoriesList from '../../NoticesCategoriesList';
// import LoadMore from '../../../LoadMore';

const Own = () => {
  const isActiveDelete = true;
  const [pets, setPets] = useState([]);
  const { data: notices } = useGetPersonalNoticeQuery();
  const { data: user } = useCurrentQuery();

  // const scroll = Scroll.animateScroll;

  const markedNotices = markFavoriteNotice(
    notices?.data,
    user?.user?.favorites
  );

  useEffect(() => {
    setPets(markedNotices);
  }, [markedNotices, notices, user]);

  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
      {/* {notices?.data.length ? <LoadMore loadMore={() => loadMore()} /> : null} */}
    </>
  );
};

export default Own;
