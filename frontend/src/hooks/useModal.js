import { useDispatch } from 'react-redux';
import { showModal, changeMarker } from '../redux/services/modalSlice';

export const useModal = () => {
  const dispatch = useDispatch();
  const openModal = marker => {
    dispatch(changeMarker(marker));
    dispatch(showModal(true));
  };
  const closeModal = () => {
    dispatch(showModal(false));
  };
  return { openModal, closeModal };
};

// export default useModal;
