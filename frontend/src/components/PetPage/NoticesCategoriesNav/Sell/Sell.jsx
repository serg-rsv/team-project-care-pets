import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  useGetNoticesBycategoryQuery,
  useAddFavoritesByIdMutation,
  useGetFavoritesNoticeQuery,
  useDeleteFavoritesByIdMutation,
} from '../../../../redux/services/noticesSlice';

import { selectIsLoggedIn } from '../../../../redux/services/authSlice';

import NoticesCategoriesList from '../../NoticesCategoriesList';

const Sell = () => {
  const isActivDelete = false;
  // const [isLogin, setIsLogin] = useState(false);

  const { data, isSuccess } = useGetNoticesBycategoryQuery('sell');
  const pets = data?.data;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data: items } = useGetFavoritesNoticeQuery();

  const [addFav] = useAddFavoritesByIdMutation();
  const [deleteFav] = useDeleteFavoritesByIdMutation();

  const addFavorites = async _id => {
    const filterAds = await items?.data.find(item => item._id === _id);
    
    if (!isLoggedIn) {
      console.log('not authorized');
    }
    if (filterAds) {
      deleteFav(_id);
    }
    await addFav(_id);
  };

  return (
    <>
      {isSuccess && (
        <NoticesCategoriesList
          isActiv={isActivDelete}
          addFavorites={addFavorites}
          pets={pets}
        />
      )}
    </>
  );
};

export default Sell;
