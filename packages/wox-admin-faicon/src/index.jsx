import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import 'wox-admin-font-awesome/font-awesome.css';

const cx = classNames.bind(styles);

const WoxFaIcon = ({ type, title, style, onClick }) => (
  <span className={cx('wox-icon')}>
    <i className={`fa ${type}`} title={title} style={style} onClick={onClick} />
  </span>
);

WoxFaIcon.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  style:PropTypes.object,
};

export default WoxFaIcon;
