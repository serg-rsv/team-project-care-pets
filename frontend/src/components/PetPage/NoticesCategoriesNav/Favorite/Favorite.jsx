import { useEffect, useState } from 'react';
import { useGetFavoritesNoticeQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';
import { setNotices } from '../../../../redux/noticesSlice';
import { useDispatch } from 'react-redux';

const Favorite = () => {
  const dispatch = useDispatch();
  const isActiveDelete = false;
  const [pets, setPets] = useState([]);
  const { data: notices } = useGetFavoritesNoticeQuery();
  const { data: user } = useCurrentQuery();

  const markedNotices = markFavoriteNotice(
    notices?.data,
    user?.user?.favorites
  );

  useEffect(() => {
    setPets(markedNotices);
    return () => dispatch(setNotices([]));
  }, [notices, user]);

  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
    </>
  );
};

export default Favorite;
