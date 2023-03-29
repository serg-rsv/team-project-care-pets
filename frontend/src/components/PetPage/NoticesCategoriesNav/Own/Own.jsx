import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGetPersonalNoticeQuery } from '../../../../redux/services/noticesSlice';
import { setNotices } from '../../../../redux/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';
import NoticesCategoriesList from '../../NoticesCategoriesList';

const Own = () => {
  const dispatch = useDispatch();
  const isActiveDelete = true;
  const [pets, setPets] = useState([]);
  const { data: notices } = useGetPersonalNoticeQuery();
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
      <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
    </>
  );
};

export default Own;
