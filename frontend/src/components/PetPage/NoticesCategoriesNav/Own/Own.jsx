import { useEffect, useState } from 'react';

import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';
import { useGetPersonalNoticeQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';

import NoticesCategoriesList from '../../NoticesCategoriesList';
import LoadMore from '../../../LoadMore';

const Own = () => {
  const isActiveDelete = true;
  const [perPage, setPerPage] = useState(4);
  const [pets, setPets] = useState([]);
  const { data: notices } = useGetPersonalNoticeQuery();
  const { data: user } = useCurrentQuery();

  useEffect(() => {
    const markedNotices = markFavoriteNotice(
      notices?.data,
      user?.user?.favorites
    );
    const slice = markedNotices.slice(0, perPage);
    setPets(slice);
  }, [notices, perPage, user]);
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

export default Own;
