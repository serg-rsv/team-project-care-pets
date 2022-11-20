import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'proptypes';

import Button from '../Button';
import Portal from '../Portal/Portal';

import { useModal } from '../../hooks/useModal';

import style from './Modal.module.scss';

const Modal = ({
  children,
  marker,
  headerContent,
  leftButtonStyle,
  leftButtonContent = 'close',
  leftButtonClick,
  leftButtonType,
  rightButtonStyle,
  rightButtonContent = 'submit',
  rightButtonType,
  rightButtonClick,
}) => {
  const showModal = useSelector(state => state.modal.showModal);
  const chageMarker = useSelector(state => state.modal.marker);
  const { closeModal } = useModal();

  return (
    <>
      {showModal && chageMarker === marker && (
        <Portal>
          <div className={style.modalOverlay} onClick={closeModal}>
            <div onClick={e => e.stopPropagation()} className={style.modalWindow}>
              <div className={style.modalHeder}>
                {headerContent}
                <Button onClick={closeModal} className={style.closeButton}>
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="30"
                    viewBox="0 -3 32 32"
                  >
                    <title>close</title>
                    <path
                      fill="inherit"
                      d="M23.733 10.304l-1.504-1.504-5.963 5.963-5.963-5.963-1.504 1.504 5.963 5.963-5.963 5.963 1.504 1.504 5.963-5.963 5.963 5.963 1.504-1.504-5.963-5.963 5.963-5.963z"
                    ></path>
                  </svg>
                </Button>
              </div>
              <div className={style.modalBody}>{children}</div>
              <div className={style.modalFooter}>
                <Button
                  onClick={leftButtonClick}
                  className={leftButtonStyle}
                  buttonType={leftButtonType}
                >
                  {leftButtonContent}
                </Button>
                <Button
                  onClick={rightButtonClick}
                  className={rightButtonStyle}
                  buttonType={rightButtonType}
                >
                  {rightButtonContent}
                </Button>
              </div>
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
  headerContent: PropTypes.node,
  leftButtonStyle: PropTypes.string,
  leftButtonContent: PropTypes.node,
  leftButtonClick: PropTypes.func,
  leftButtonType: PropTypes.string,
  rightButtonStyle: PropTypes.string,
  rightButtonContent: PropTypes.node,
  rightButtonType: PropTypes.string,
  rightButtonClick: PropTypes.func,
};

export default Modal;
