import React from 'react';
import PropTypes from 'proptypes';

const Button = ({
  children,
  onClick,
  className,
  buttonType = 'button',
  disabled,
}) => {
  return (
    <button
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
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  buttonType: PropTypes.string,
};

export default Button;
