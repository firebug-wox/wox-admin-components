import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import WoxTitle from 'wox-admin-title';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import themeConfig from '../lib';

const cx = classNames.bind(styles);

class DemoComponent extends Component {
  renderCode = () => {
    const keys = Object.keys(themeConfig);
    const code = [];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = themeConfig[keys[i]];

      code.push(<p key={i}><span style={{paddingLeft: '10px', fontWeight: 'bold'}}>{key}: </span><span style={{padding: '3px 6px', color: value === '#fff' ? '#24292e' : '#fff', backgroundColor: value}}>{themeConfig[keys[i]]}</span></p>);
    }

    return code;
  }

  render() {
    return (
      <div style={{padding: '10px'}}>
        <h1>Theme Config List</h1>
        <div style={{backgroundColor: '#f2f2f2', borderRadius: '5px', padding: '1em 20px 10px', fontSize: '16px'}}>
          {
            this.renderCode()
          }
        </div>
        <br />
        <h1>Base Component List</h1>
        <div className={cx('btns')}>
          <h2>Button</h2>
          <Button type="primary">Primary</Button>
          <Button type="danger">Danger</Button>
        </div>
        <br />
        <h1>Business Component List</h1>
        <div>
          <h2>Title</h2>
          <WoxTitle>标题</WoxTitle>
        </div>
      </div>
    );
  }
}

export default DemoComponent;
