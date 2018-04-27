'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _styleMod = require('./style.mod.less');

var _styleMod2 = _interopRequireDefault(_styleMod);

require('wox-admin-font-awesome/font-awesome.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind2.default.bind(_styleMod2.default);

var WoxFaIcon = function WoxFaIcon(_ref) {
  var type = _ref.type,
      title = _ref.title,
      style = _ref.style,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'span',
    { className: cx('wox-icon') },
    _react2.default.createElement('i', { className: 'fa ' + type, title: title, style: style, onClick: onClick })
  );
};

WoxFaIcon.propTypes = {
  title: _propTypes2.default.string,
  type: _propTypes2.default.string.isRequired,
  style: _propTypes2.default.object
};

exports.default = WoxFaIcon;
