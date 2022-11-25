import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'proptypes';
import { selectShowModal, selectChangeMarker } from '../../redux/selectors';

import Button from '../Button';
import Portal from '../Portal/Portal';

import { useModal } from '../../hooks/useModal';

import style from './Modal.module.scss';

const Modal = ({ children, marker, closeButton }) => {
  const showModal = useSelector(selectShowModal);
  const changeMarker = useSelector(selectChangeMarker);
  const { closeModal } = useModal();

  return (
    <>
      {showModal && changeMarker === marker && (
        <Portal onKeyPress={closeModal}>
          <div className={style.modalOverlay} onClick={closeModal}>
            <div
              className={style.modalWindow}
              onClick={e => e.stopPropagation()}
            >
              {closeButton && (
                <Button onClick={closeModal} className={style.closeButton}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>close</title>
                    <path d="M1 1L13 13" />
                    <path d="M1 13L13 1" />
                  </svg>
                </Button>
              )}
              {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  marker: PropTypes.string.isRequired,
  closeButton: PropTypes.bool,
};

export default Modal;
