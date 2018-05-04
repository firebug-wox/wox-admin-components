import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';

const cx = classNames.bind(styles);
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const WoxMenu = ({ mode, menuDdata, current, onClick, theme}) => (
  <div className={cx('wox-menu')}>
    <Menu selectedKeys={current} mode={mode} onClick={(e) => onClick(e)} theme={theme}>
      {
        menuDdata.map(value => {
          const child = value.child;
          if (child) {
            return (
              <SubMenu key={value.key} title={value.title}>
                {
                  child.map(cil => {
                    if (cil.group) {
                      return (
                        <MenuItemGroup key={cil.key} title={cil.group}>
                          {
                            cil.item.map(item =>(
                              <Menu.Item key={item.key}>
                                <a href={item.url}>{ item.title }</a>
                              </Menu.Item>
                            ))
                          }
                        </MenuItemGroup>
                      );
                    } else {
                      return (
                        cil.item.map(item =>(
                          <Menu.Item key={item.key}>
                            <a href={item.url}>{ item.title }</a>
                          </Menu.Item>
                        ))
                      );
                    }
                  })
                }
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={value.key}>
                <a href={value.url}>{ value.title }</a>
              </Menu.Item>
            );
          }
        })
      }
    </Menu>
  </div>
);

WoxMenu.propTypes = {
  mode: PropTypes.oneOfType([PropTypes.string]),
  menuDdata: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    url: PropTypes.string,
    child: PropTypes.array,
  }).isRequired).isRequired,
  current: PropTypes.oneOfType([PropTypes.array]),
  onClick: PropTypes.func,
  theme: PropTypes.string,
};

WoxMenu.defaultProps = {
  mode: 'horizontal',
  current: [],
  theme: 'light',
  onClick: () => {}
};

export default WoxMenu;
