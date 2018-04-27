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

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * urlFn[Function]					          // 数据请求url参数拼接函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * callback[Function]					        // 回调函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * initData[Array[Object]] : {key:xxx, vlabel: xxx}  	// 初始传入数据
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * keyName[String]  					        // 返回数据的key值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * singleType[Boolean]					      // 是否单选模式，初始传入
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * disabled[Boolean]					        // 是否只读
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * formatDataFn[function]             // 格式化获取数据函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * formatLabelFn[function]            // 格式化展示数据函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               **/

var Option = _select2.default.Option;

var WoxGtourAutoComplete = function (_Component) {
  _inherits(WoxGtourAutoComplete, _Component);

  function WoxGtourAutoComplete(props) {
    _classCallCheck(this, WoxGtourAutoComplete);

    var _this2 = _possibleConstructorReturn(this, (WoxGtourAutoComplete.__proto__ || Object.getPrototypeOf(WoxGtourAutoComplete)).call(this, props));

    _this2.fetchData = (0, _lodash2.default)(_this2.fetchData, 500);
    _this2.state = { data: [], value: [], fetching: false };
    _this2.fetchData = _this2.fetchData.bind(_this2);
    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  _createClass(WoxGtourAutoComplete, [{
    key: 'fetchData',
    value: function fetchData(value) {
      if (!/^\s*$/.test(value)) {
        this.setState({ fetching: true });
        var _this = this,
            _props = this.props,
            urlFn = _props.urlFn,
            formatDataFn = _props.formatDataFn;
        (0, _reqwest2.default)({
          url: urlFn(value),
          contentType: 'application/json',
          success: function success(res) {
            if (res.rs === 1) {
              var formatData = formatDataFn ? formatDataFn(res.data, value) : res.data;
              _this.setState({ data: formatData, fetching: false });
            } else {
              _message2.default.error('查询数据失败！', 3);
            }
          }
        });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      this.setState({ data: [], fetching: false });
      var _props2 = this.props,
          _props2$singleType = _props2.singleType,
          singleType = _props2$singleType === undefined ? false : _props2$singleType,
          formatLabelFn = _props2.formatLabelFn,
          callback = _props2.callback;

      if (singleType && value.length > 0) {
        value = [value[value.length - 1]];
      }
      // 修改 label 展示方式
      var formatLabel = formatLabelFn ? formatLabelFn(value) : value;
      callback(_defineProperty({}, this.props.keyName, formatLabel));
    }
  }, {
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
        data.map(function (d, i) {
          return _react2.default.createElement(
            Option,
            { key: d.key },
            d.label
          );
        })
      );
    }
  }]);

  return WoxGtourAutoComplete;
}(_react.Component);

exports.default = WoxGtourAutoComplete;
