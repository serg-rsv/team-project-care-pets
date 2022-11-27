import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';
import { setNotices } from '../../../../redux/noticesSlice';
import { useGetPersonalNoticeQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';

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
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
    </>
  );
};

export default Own;
