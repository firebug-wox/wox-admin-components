'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _breadcrumb = require('antd/lib/breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

require('antd/lib/icon/style');

require('antd/lib/breadcrumb/style');

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

var WoxBreadcrumb = function WoxBreadcrumb(_ref) {
  var items = _ref.items;

  var dynamicItems = [];
  if (items) {
    dynamicItems = items.map(function (value, index) {
      var idx = index;
      if (value.href) {
        return _react2.default.createElement(
          _breadcrumb2.default.Item,
          { key: idx },
          _react2.default.createElement(
            'a',
            { href: value.href },
            value.title
          )
        );
      }
      return _react2.default.createElement(
        _breadcrumb2.default.Item,
        { key: idx },
        value.title
      );
    });
  }

  return _react2.default.createElement(
    'div',
    { className: cx('bread-crumb') },
    _react2.default.createElement(
      _breadcrumb2.default,
      null,
      _react2.default.createElement(
        _breadcrumb2.default.Item,
        null,
        _react2.default.createElement(
          'a',
          { href: '//admin.quimg.com' },
          _react2.default.createElement(_icon2.default, { type: 'home' }),
          '\u9996\u9875'
        )
      ),
      dynamicItems
    )
  );
};

WoxBreadcrumb.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    title: _propTypes2.default.string.isRequired,
    herf: _propTypes2.default.string
  }).isRequired).isRequired
};

exports.default = WoxBreadcrumb;
