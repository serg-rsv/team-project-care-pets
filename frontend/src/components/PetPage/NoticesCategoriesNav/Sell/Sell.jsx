import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { selectIsLoggedIn } from '../../../../redux/services/authSlice';
import { useGetNoticesBycategoryQuery } from '../../../../redux/services/noticesSlice';
import { useCurrentQuery } from '../../../../redux/services/usersSlice';
import { markFavoriteNotice } from '../../../../helpers/markFavoriteNotice';

import NoticesCategoriesList from '../../NoticesCategoriesList';

const Sell = () => {
  const isActivDelete = false;
  const [pets, setPets] = useState([]);
  const { data: notices, isSuccess: isNotices } =
    useGetNoticesBycategoryQuery('sell');
  console.log('Sell ~ notices', notices?.data);
  const { data: user, isSuccess: isUser } = useCurrentQuery();
  console.log('Sell ~ user', user);
  // const pets = data?.data;
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const { data: items } = useGetFavoritesNoticeQuery();

  useEffect(() => {
    const markedNotices = markFavoriteNotice(
      notices?.data,
      user?.data?.user?.favorites
    );
    setPets(markedNotices);
  }, [notices, user]);

  return (
    <>
      {pets?.length > 0 && (
        <NoticesCategoriesList isActiv={isActivDelete} pets={pets} />
      )}
    </>
  );
};

export default Sell;
