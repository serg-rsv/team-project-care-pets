import React from 'react';
import PropTypes from 'proptypes';
import cn from 'classnames';
import cnBind from 'classnames/bind';

import style from './Button.module.scss';

const Button = ({ children, onClick, className, buttonType = 'button' }) => {
  const cx = cnBind.bind(style);
  const classes = cx('btn', className);
  return (
    <button type={buttonType} className={cn(classes)} onClick={onClick}>
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
