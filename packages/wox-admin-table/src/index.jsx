import React, { Component } from 'react';
import { Table } from 'antd';      // 依赖的 `antd` 组件必须按照这种方式引入，不需要手动引用样式文件，`babel-plugin-import` 插件会自动引入
import classNames from 'classnames/bind';
import styles from './style.mod.less';

const cx = classNames.bind(styles);

/**
 * 组件名遵循 `Wox` 前缀的规范
 */
class WoxTable extends Component {

  setRowClassName = (record, index) => {
    if (index % 2) {
      return 'odd';
    } else {
      return 'even';
    }
  }

  render() {
    let attrs = {};
    const rowClassName = {
      rowClassName: this.props.rowColorDifferent && (this.props.rowColorDifferent === true) ? this.setRowClassName : ()=>{}
    };
    if (this.props.rowClassName) {
      attrs = { ...this.props };
    } else {
      attrs = Object.assign({ ...this.props }, rowClassName);      
    }
    return (
      <div className={cx('wrapper')}>
        <Table { ...attrs } />
      </div>
    );
  }
}

export default WoxTable;
