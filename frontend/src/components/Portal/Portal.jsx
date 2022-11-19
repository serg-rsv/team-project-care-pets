// import { React, createElement } from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useMemo } from 'react';
// import { createElement } from 'react';
import { useSelector } from 'react-redux';

const Portal = ({ children }) => {
  const chageMarker = useSelector(state => state.chageMarker);
  console.log(chageMarker);
  // const marker = marker;
  // const element = document.createElement('div');
  const element = useMemo(() => {
    const element = document.createElement('div');
    element.dataset.marker = chageMarker;
    return element;
  }, [chageMarker]);

  useEffect(() => {
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  });
  return createPortal(children, element);
};

export default Portal;
