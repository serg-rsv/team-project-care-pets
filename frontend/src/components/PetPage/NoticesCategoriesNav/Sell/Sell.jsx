import { useEffect, useState } from 'react';

import { useGetNoticesBycategoryQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';

const Sell = () => {
  const isActiveDelete = false;
  const [pets, setPets] = useState([]);
  const { data: notices } = useGetNoticesBycategoryQuery('sell');
  const { data: user } = useCurrentQuery();

  useEffect(() => {
    console.log('FAV is CHANGED', user?.user?.favorites);
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
