'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spin = require('antd/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/spin/style');

require('antd/lib/message/style');

require('antd/lib/select/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _select2.default.Option;

var WoxAutoComplete = function (_Component) {
  _inherits(WoxAutoComplete, _Component);

  function WoxAutoComplete(props) {
    _classCallCheck(this, WoxAutoComplete);

    var _this = _possibleConstructorReturn(this, (WoxAutoComplete.__proto__ || Object.getPrototypeOf(WoxAutoComplete)).call(this, props));

    _this.fetchData = function (value) {
      if (!/^\s*$/.test(value)) {
        var _this$props = _this.props,
            urlFn = _this$props.urlFn,
            formatDataFn = _this$props.formatDataFn;

        _this.setState({
          fetching: true
        });
        (0, _axios2.default)({
          url: urlFn(value),
          headers: { 'Content-Type': 'application/json' }
        }).then(function (_ref) {
          var res = _ref.data;

          if (res.rs === 1) {
            var formatData = formatDataFn ? formatDataFn(res.data, value) : res.data;
            _this.setState({
              data: formatData,
              fetching: false
            });
          } else {
            _message2.default.error('查询数据失败！', 3);
          }
        });
      }
    };

    _this.handleChange = function (value) {
      var _this$props2 = _this.props,
          _this$props2$singleTy = _this$props2.singleType,
          singleType = _this$props2$singleTy === undefined ? false : _this$props2$singleTy,
          formatLabelFn = _this$props2.formatLabelFn,
          callback = _this$props2.callback;


      _this.setState({
        data: [],
        fetching: false
      });
      if (singleType && value.length > 0) {
        value = [value[value.length - 1]];
      }
      var formatLabel = formatLabelFn ? formatLabelFn(value) : value; // 修改 label 展示方式
      callback(_defineProperty({}, _this.props.keyName, formatLabel));
    };

    _this.fetchData = (0, _lodash2.default)(_this.fetchData, 500);
    _this.state = {
      data: [],
      value: [],
      fetching: false
    };
    return _this;
  }

  _createClass(WoxAutoComplete, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          fetching = _state.fetching,
          data = _state.data;


      return _react2.default.createElement(
        _select2.default,
        {
          mode: 'multiple',
          labelInValue: true,
          value: this.props.initData || [],
          placeholder: this.props.placeholder || '搜索',
          notFoundContent: fetching ? _react2.default.createElement(_spin2.default, { size: 'small' }) : null,
          filterOption: false,
          onSearch: this.fetchData,
          onChange: this.handleChange,
          disabled: !!this.props.disabled,
          style: _extends({ width: '600px' }, this.props.style || {})
        },
        data.map(function (item, index) {
          return _react2.default.createElement(
            Option,
            { key: item.key },
            teim.label
          );
        })
      );
    }
  }]);

  return WoxAutoComplete;
}(_react.Component);

exports.default = WoxAutoComplete;
