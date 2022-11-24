import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'proptypes';
import { selectShowModal, selectChangeMarker } from '../../redux/selectors';

import Button from '../Button';
import Portal from '../Portal/Portal';

import { useModal } from '../../hooks/useModal';

import style from './Modal.module.scss';

const Modal = ({
  children,
  marker,
  headerContent = null,
  closeButton,
  leftButton,
  leftButtonStyle,
  leftButtonContent = 'close',
  leftButtonClick,
  leftButtonType,
  rightButton,
  rightButtonStyle,
  rightButtonContent = 'submit',
  rightButtonType,
  rightButtonClick,
  disabled,
}) => {
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
              <div className={style.modalBody}>{children}</div>
              <div className={style.modalFooter}>
                {leftButton && (
                  <Button
                    button
                    disabled={disabled}
                    onClick={leftButtonClick}
                    className={leftButtonStyle}
                    buttonType={leftButtonType}
                  >
                    {leftButtonContent}
                  </Button>
                )}
                {rightButton && (
                  <Button
                    onClick={rightButtonClick}
                    className={rightButtonStyle}
                    buttonType={rightButtonType}
                  >
                    {rightButtonContent}
                  </Button>
                )}
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
  closeButton: PropTypes.bool,
  leftButton: PropTypes.bool,
  leftButtonStyle: PropTypes.string,
  leftButtonContent: PropTypes.node,
  leftButtonClick: PropTypes.func,
  leftButtonType: PropTypes.string,
  rightButton: PropTypes.bool,
  rightButtonStyle: PropTypes.string,
  rightButtonContent: PropTypes.node,
  rightButtonType: PropTypes.string,
  rightButtonClick: PropTypes.func,
};

export default Modal;
