'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

require('antd/lib/menu/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _styleMod = require('./style.mod.less');

var _styleMod2 = _interopRequireDefault(_styleMod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind2.default.bind(_styleMod2.default);
var SubMenu = _menu2.default.SubMenu;
var MenuItemGroup = _menu2.default.ItemGroup;

var WoxMenu = function WoxMenu(_ref) {
  var mode = _ref.mode,
      menuDdata = _ref.menuDdata,
      current = _ref.current,
      _onClick = _ref.onClick,
      theme = _ref.theme;
  return _react2.default.createElement(
    'div',
    { className: cx('wox-menu') },
    _react2.default.createElement(
      _menu2.default,
      { selectedKeys: current, mode: mode, onClick: function onClick(e) {
          return _onClick(e);
        }, theme: theme },
      menuDdata.map(function (value) {
        var child = value.child;
        if (child) {
          return _react2.default.createElement(
            SubMenu,
            { key: value.key, title: value.title },
            child.map(function (cil) {
              if (cil.group) {
                return _react2.default.createElement(
                  MenuItemGroup,
                  { key: cil.key, title: cil.group },
                  cil.item.map(function (item) {
                    return _react2.default.createElement(
                      _menu2.default.Item,
                      { key: item.key },
                      _react2.default.createElement(
                        'a',
                        { href: item.url },
                        item.title
                      )
                    );
                  })
                );
              } else {
                return cil.item.map(function (item) {
                  return _react2.default.createElement(
                    _menu2.default.Item,
                    { key: item.key },
                    _react2.default.createElement(
                      'a',
                      { href: item.url },
                      item.title
                    )
                  );
                });
              }
            })
          );
        } else {
          return _react2.default.createElement(
            _menu2.default.Item,
            { key: value.key },
            _react2.default.createElement(
              'a',
              { href: value.url },
              value.title
            )
          );
        }
      })
    )
  );
};

WoxMenu.propTypes = {
  mode: _propTypes2.default.oneOfType([_propTypes2.default.string]),
  menuDdata: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    title: _propTypes2.default.string.isRequired,
    key: _propTypes2.default.string.isRequired,
    url: _propTypes2.default.string,
    child: _propTypes2.default.array
  }).isRequired).isRequired,
  current: _propTypes2.default.oneOfType([_propTypes2.default.array]),
  onClick: _propTypes2.default.func,
  theme: _propTypes2.default.string
};

WoxMenu.defaultProps = {
  mode: 'horizontal',
  current: [],
  theme: 'light',
  onClick: function onClick() {}
};

exports.default = WoxMenu;
