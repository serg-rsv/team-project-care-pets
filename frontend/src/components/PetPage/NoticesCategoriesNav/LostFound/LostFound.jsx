import { useSelector } from 'react-redux';
import {
  useGetNoticesBycategoryQuery,
  useAddFavoritesByIdMutation,
  useGetFavoritesNoticeQuery,
  useDeleteFavoritesByIdMutation,
} from '../../../../redux/services/noticesSlice';

import { selectIsLoggedIn } from '../../../../redux/services/authSlice';

import NoticesCategoriesList from '../../NoticesCategoriesList';

const LostFound = () => {
  const isActivDelete = false;

  const { data, isSuccess } = useGetNoticesBycategoryQuery('lost-found');
  const pets = data?.data;

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data: items } = useGetFavoritesNoticeQuery();

  const [addFav] = useAddFavoritesByIdMutation();
  const [deleteFav] = useDeleteFavoritesByIdMutation();

  const addFavorites = async _id => {
    const filterAds = items?.data.find(item => item._id === _id);
    console.log(filterAds);
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

export default LostFound;
