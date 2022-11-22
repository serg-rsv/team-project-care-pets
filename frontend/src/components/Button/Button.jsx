import React from 'react';
import PropTypes from 'proptypes';

const Button = ({ children, onClick, className, buttonType = 'button' }) => {
  return (
    <button type={buttonType} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  buttonType: PropTypes.string,
};

export default Button;
