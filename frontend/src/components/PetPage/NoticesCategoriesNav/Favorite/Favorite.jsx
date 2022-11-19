import {
  useGetFavoritesNoticeQuery,
  useDeleteFavoritesByIdMutation,
} from '../../../../redux/services/noticesSlice';
import NoticesCategoriesList from '../../NoticesCategoriesList';

const Favorite = () => {
  const isActivDelete = false;
  const { data, isSuccess } = useGetFavoritesNoticeQuery();
  const pets = data?.data;
  const [deleteFav] = useDeleteFavoritesByIdMutation();

  const addFavorites = async _id => {
    deleteFav(_id);
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

export default Favorite;
