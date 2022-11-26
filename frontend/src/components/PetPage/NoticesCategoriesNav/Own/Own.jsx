import { useEffect, useState } from 'react';

import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';
import { useGetPersonalNoticeQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';

import NoticesCategoriesList from '../../NoticesCategoriesList';
import LoadMore from '../../../LoadMore';

const Own = () => {
  const isActiveDelete = true;
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const { data: notices } = useGetPersonalNoticeQuery({ page, limit: 4 });
  const { data: user } = useCurrentQuery();
  const markedNotices = markFavoriteNotice(
    notices?.data,
    user?.user?.favorites
  );
  useEffect(() => {
    setPets(markedNotices);
  }, [notices, user]);

  const loadMore = () => {
    setPage(page + 1);
    setPets(pets.concat(markedNotices));
  };
  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
      {notices?.page !== notices?.totalPages && notices?.totalPages !== 0 ? (
        <LoadMore loadMore={() => loadMore()} />
      ) : null}
    </>
  );
};

export default Own;
