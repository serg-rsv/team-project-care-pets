import { useDispatch } from 'react-redux';
import { showModal, changeMarker } from '../redux/services/modalSlice';

export const useModal = () => {
  const dispatch = useDispatch();
  const openModal = marker => {
    dispatch(changeMarker(marker));
    dispatch(showModal(true));
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    dispatch(showModal(false));
    document.body.style.overflow = 'auto';
  };
  return { openModal, closeModal };
};

// export default useModal;
