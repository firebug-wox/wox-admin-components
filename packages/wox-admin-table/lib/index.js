'use strict';

exports.__esModule = true;

var _table = require('antd/lib/table');

var _table2 = _interopRequireDefault(_table);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('antd/lib/table/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _styleMod = require('./style.mod.less');

var _styleMod2 = _interopRequireDefault(_styleMod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 依赖的 `antd` 组件必须按照这种方式引入，不需要手动引用样式文件，`babel-plugin-import` 插件会自动引入


var cx = _bind2.default.bind(_styleMod2.default);

/**
 * 组件名遵循 `Wox` 前缀的规范
 */

var WoxTable = function (_Component) {
  _inherits(WoxTable, _Component);

  function WoxTable() {
    var _temp, _this, _ret;

    _classCallCheck(this, WoxTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.setRowClassName = function (record, index) {
      if (index % 2) {
        return 'odd';
      } else {
        return 'even';
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  WoxTable.prototype.render = function render() {
    var attrs = {};
    var rowClassName = {
      rowClassName: this.props.rowColorDifferent && this.props.rowColorDifferent === true ? this.setRowClassName : function () {}
    };
    if (this.props.rowClassName) {
      attrs = _extends({}, this.props);
    } else {
      attrs = Object.assign(_extends({}, this.props), rowClassName);
    }
    return _react2.default.createElement(
      'div',
      { className: cx('wrapper') },
      _react2.default.createElement(_table2.default, attrs)
    );
  };

  return WoxTable;
}(_react.Component);

exports.default = WoxTable;
