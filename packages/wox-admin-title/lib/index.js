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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind2.default.bind(_styleMod2.default);

var WoxTitle = function WoxTitle(_ref) {
  var title = _ref.title,
      children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: cx('title') },
    _react2.default.createElement(
      'span',
      null,
      title
    ),
    children
  );
};

WoxTitle.propTypes = {
  title: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array])
};

WoxTitle.defaultProps = {
  children: []
};

exports.default = WoxTitle;
