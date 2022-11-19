import { useGetNoticesBycategoryQuery } from '../../../../redux/services/noticesSlice';
import NoticesCategoriesList from '../../NoticesCategoriesList';


const Sell = () => {
  const { data, isSuccess } = useGetNoticesBycategoryQuery('sell');
  const pets = data?.data;
  return <>{isSuccess && <NoticesCategoriesList pets={pets} />}</>;
};

export default Sell;
