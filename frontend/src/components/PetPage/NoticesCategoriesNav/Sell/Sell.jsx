import Scroll from 'react-scroll';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotices } from '../../../../redux/noticesSlice';
import { selectNotices, selectIsLoadMore } from '../../../../redux/selectors';

import { useGetNoticesByCategoryQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';
import LoadMore from '../../../LoadMore';
import { Loader } from '../../../Loader/Loader';

<<<<<<< HEAD:frontend/src/components/PetPage/NoticesCategoriesNav/Category/Category.jsx
const Category = () => {
  const { data: user } = useCurrentQuery();
=======
const Sell = () => {
>>>>>>> 917426f6ae0bac6134856410c93e793e19b22b89:frontend/src/components/PetPage/NoticesCategoriesNav/Sell/Sell.jsx
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const pets = useSelector(selectNotices);
  const isLoadMore = useSelector(selectIsLoadMore);

  const scroll = Scroll.animateScroll;

  const isActiveDelete = false;
  const { data: noticesCategory, isFetching } = useGetNoticesByCategoryQuery({
    category: 'sell',
    page,
    limit: 4,
  });

  const markedNotices = markFavoriteNotice(
    noticesCategory?.data,
    user?.user?.favorites
  );

  useEffect(() => {
    dispatch(setNotices(pets.concat(markedNotices)));
    if (page !== 1) {
      scroll.scrollToBottom({ duration: 1000 });
    }
  }, [noticesCategory]);

  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActive={isActiveDelete} pets={pets} />
      )}
      {isFetching && <Loader />}
      {isLoadMore && page < noticesCategory?.totalPages ? (
        <LoadMore loadMore={() => setPage(page + 1)} disabled={isFetching} />
      ) : null}
    </>
  );
};

export default Sell;
