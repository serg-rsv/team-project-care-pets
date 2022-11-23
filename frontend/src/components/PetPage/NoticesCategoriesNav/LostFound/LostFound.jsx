import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotices } from '../../../../redux/noticesSlice';
import { selectNotices } from '../../../../redux/selectors';

import { useGetNoticesByCategoryQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';
import LoadMore from '../../../LoadMore';
const LostFound = () => {
  const dispatch = useDispatch();
  const pets = useSelector(selectNotices);

  const isActiveDelete = false;
  const [perPage, setPerPage] = useState(4);
  // const [pets, setPets] = useState([]);
  const { data: noticesCategory } = useGetNoticesByCategoryQuery('lost-found');
  const { data: user } = useCurrentQuery();

  useEffect(() => {
    const markedNotices = markFavoriteNotice(
      noticesCategory?.data,
      user?.user?.favorites
    );
    const slice = markedNotices.slice(0, perPage);
    // setPets(slice);
    dispatch(setNotices(markedNotices));
  }, [dispatch, noticesCategory, user?.user?.favorites]);

const loadMore = () => {
  // setPerPage(perPage + perPage);
};
return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
      {/* {notices?.data.length > perPage ? ( */}
        <LoadMore loadMore={() => loadMore()}>Load more</LoadMore>
      {/* ) : null} */}
    </>
  );
};

export default LostFound;
