import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  className,
  buttonType = 'button',
  disabled,
}) => {
  return (
    <button
      button
      disabled={disabled}
      type={buttonType}
      className={className}
      onClick={onClick}
    >
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
