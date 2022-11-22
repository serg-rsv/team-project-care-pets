import { useEffect, useState } from 'react';

import { useGetNoticesByCategoryQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';
import LoadMore from '../../../LoadMore';

const Sell = () => {
  const [perPage, setPerPage] = useState(4);
  const isActiveDelete = false;
  const [pets, setPets] = useState([]);
  const { data: notices } = useGetNoticesByCategoryQuery('sell');
  const { data: user } = useCurrentQuery();

  useEffect(() => {
    const markedNotices = markFavoriteNotice(
      notices?.data,
      user?.user?.favorites
    );
    const slice = markedNotices.slice(0, perPage);
    setPets(slice);
  }, [notices, user, perPage]);

  const loadMore = () => {
    setPerPage(perPage + perPage);
  };

  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
      {notices?.data.length > perPage ? (
        <LoadMore loadMore={() => loadMore()}>Load more</LoadMore>
      ) : null}
    </>
  );
};

export default Sell;
