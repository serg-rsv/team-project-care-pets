import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotices } from '../../../../redux/noticesSlice';
import { selectNotices } from '../../../../redux/selectors';

import { useGetNoticesByCategoryQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';

const Sell = () => {
  const dispatch = useDispatch();
  const pets = useSelector(selectNotices);

  const isActiveDelete = false;
  const { data: noticesCategory } = useGetNoticesByCategoryQuery('sell');
  const { data: user } = useCurrentQuery();

  useEffect(() => {
    const markedNotices = markFavoriteNotice(
      noticesCategory?.data,
      user?.user?.favorites
    );
    dispatch(setNotices(markedNotices));
  }, [dispatch, noticesCategory, user?.user?.favorites]);

  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
    </>
  );
};

export default Sell;
