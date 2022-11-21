// import { React, createElement } from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Portal = ({ children, onKeyPress }) => {
  const chageMarker = useSelector(state => state.modal.marker);
  const element = useMemo(() => {
    const element = document.createElement('div');
    element.dataset.marker = chageMarker;
    return element;
  }, [chageMarker]);

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
