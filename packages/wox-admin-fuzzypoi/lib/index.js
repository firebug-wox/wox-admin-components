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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

require('./style.mod.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 组件名遵循 `Wox` 前缀的规范
 */
var Option = _select2.default.Option;

var WoxFuzzPoi = function (_Component) {
  _inherits(WoxFuzzPoi, _Component);

  function WoxFuzzPoi(props) {
    _classCallCheck(this, WoxFuzzPoi);

    var _this2 = _possibleConstructorReturn(this, (WoxFuzzPoi.__proto__ || Object.getPrototypeOf(WoxFuzzPoi)).call(this, props));

    _this2.lastFetchId = 0;
    _this2.fetchData = (0, _lodash2.default)(_this2.fetchData, 500);
    _this2.state = {
      data: [],
      value: [],
      fetching: false
    };
    return _this2;
  }

  _createClass(WoxFuzzPoi, [{
    key: 'fetchData',
    value: function fetchData(value) {
      if (/^\s*$/.test(value)) {
        this.setState({
          data: [],
          fetching: false
        });
        return;
      }
      this.setState({ fetching: true });
      var _this = this;
      (0, _reqwest2.default)({
        url: this.props.host + '/poi/query/suggest?keyword=' + value + '&count=' + (this.props.count || 10) + '&dataType=' + (this.props.dataType || ''),
        success: function success(res) {
          if (res.rs === 1) {
            var data = res.data.map(function (v) {
              return {
                key: v.code,
                label: v.code + ' | ' + v.cnName
              };
            });
            _this.setState({ data: data, fetching: false });
          } else {
            _message2.default.error('查询数据失败！', 3);
          }
        }
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      this.setState({ data: [], fetching: false });
      if (this.props.singleType && value.length > 0) {
        value = [value[value.length - 1]];
      }
      this.props.callback(_defineProperty({}, this.props.keyName, value));
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
          onSearch: this.fetchData.bind(this),
          onChange: this.handleChange.bind(this),
          disabled: !!this.props.disabled,
          style: _extends({ width: '600px' }, this.props.style)
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

  return WoxFuzzPoi;
}(_react.Component);

WoxFuzzPoi.propTypes = {
  callback: _propTypes2.default.func.isRequired,
  dataType: _propTypes2.default.string,
  count: _propTypes2.default.number,
  initData: _propTypes2.default.arrayOf(_propTypes2.default.object),
  singleType: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  placeholder: _propTypes2.default.string,
  host: _propTypes2.default.string.isRequired,
  keyName: _propTypes2.default.string.isRequired
};

WoxFuzzPoi.defaultProps = {
  dataType: [],
  initData: [],
  count: 10,
  singleType: false,
  disabled: false,
  style: {},
  placeholder: '搜索'
};

exports.default = WoxFuzzPoi;
