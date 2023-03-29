// import { React, createElement } from 'react';
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

const Portal = ({ children, onKeyPress }) => {
  const changeMarker = useSelector(state => state.modal.marker);
  const element = useMemo(() => {
    const element = document.createElement('div');
    element.dataset.marker = changeMarker;
    return element;
  }, [changeMarker]);

  const pressKey = e => {
    if (e.code === 'Escape') {
      onKeyPress();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', pressKey, true);
    document.body.appendChild(element);
    return () => {
      document.body.removeEventListener('keydown', pressKey, true);
      document.body.removeChild(element);
    };
  });
  return createPortal(children, element);
};

export default Portal;
