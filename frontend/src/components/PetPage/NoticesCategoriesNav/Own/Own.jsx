import { useEffect, useState } from 'react';

import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';
import { useGetPersonalNoticeQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';

import NoticesCategoriesList from '../../NoticesCategoriesList';

const Own = () => {
  const isActiveDelete = true;
  const [pets, setPets] = useState([]);
  const { data: notices } = useGetPersonalNoticeQuery();
  const { data: user } = useCurrentQuery();

  useEffect(() => {
    const markedNotices = markFavoriteNotice(
      notices?.data,
      user?.user?.favorites
    );
    setPets(markedNotices);
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
