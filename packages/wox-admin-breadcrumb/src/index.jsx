import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Breadcrumb } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';

const cx = classNames.bind(styles);

const WoxBreadcrumb = ({ items }) => {
  let dynamicItems = [];
  if (items) {
    dynamicItems = items.map((value, index) => {
      const idx = index;
      if (value.href) {
        return (
          <Breadcrumb.Item key={idx}>
            <a href={value.href}>{value.title}</a>
          </Breadcrumb.Item>
        );
      }
      return (
        <Breadcrumb.Item key={idx}>
          {value.title}
        </Breadcrumb.Item>
      );
    });
  }

  return (
    <div className={cx('bread-crumb')}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="//admin.quimg.com"><Icon type="home" />首页</a>
        </Breadcrumb.Item>
        {dynamicItems}
      </Breadcrumb>
    </div>
  );
};

WoxBreadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    herf: PropTypes.string,
  }).isRequired).isRequired,
};

export default WoxBreadcrumb;
