import React from 'react';
import PropTypes from 'proptypes';
import cn from 'classnames';
import cnBind from 'classnames/bind';

import style from './button.module.scss';

const Button = ({ children, onClick, className }) => {
  const cx = cnBind.bind(style);
  const classes = cx('btn', className);
  return (
    <button type="button" className={cn(classes)} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
