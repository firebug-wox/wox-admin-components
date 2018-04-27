import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.mod.less';

const cx = classNames.bind(styles);

const WoxTitle = ({ title, children }) => (
  <div className={cx('title')}>
    <span>{title}</span>
    {children}
  </div>
);

WoxTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

WoxTitle.defaultProps = {
  children: [],
};

export default WoxTitle;
