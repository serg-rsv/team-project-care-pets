import { useEffect, useState } from 'react';

import { useGetNoticesByCategoryQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';

const Sell = () => {
  const isActiveDelete = false;
  const [pets, setPets] = useState([]);
  const { data: notices } = useGetNoticesByCategoryQuery('sell');
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

export default Sell;
