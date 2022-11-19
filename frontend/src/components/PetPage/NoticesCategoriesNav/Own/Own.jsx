import { useSelector } from 'react-redux';
import {
  useGetPersonalNoticeQuery,
  useAddFavoritesByIdMutation,
  useGetFavoritesNoticeQuery,
  useDeleteFavoritesByIdMutation,
  useDeleteNoticeMutation,
} from '../../../../redux/services/noticesSlice';

import NoticesCategoriesList from '../../NoticesCategoriesList';

const Own = () => {
  const isActivDelete = true;
  const { data, isSuccess } = useGetPersonalNoticeQuery();
  const pets = data?.data;

  const { data: items } = useGetFavoritesNoticeQuery();

  const [addFav] = useAddFavoritesByIdMutation();
  const [deleteFav] = useDeleteFavoritesByIdMutation();
  const [deleteAds] = useDeleteNoticeMutation();

  const addFavorites = async _id => {
    const filterAds = await items?.data.find(item => item._id === _id);
    if (filterAds) {
      deleteFav(_id);
    }
    await addFav(_id);
  };

  const removeAds = async _id => {
    await deleteAds(_id);
  };

  return (
    <>
      {isSuccess && (
        <NoticesCategoriesList
          isActiv={isActivDelete}
          addFavorites={addFavorites}
          removeAds={removeAds}
          pets={pets}
        />
      )}
    </>
  );
};

export default Own;
