'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var assign = Object.assign;

var WoxQueryForm = function WoxQueryForm(InfosForm) {
  var HOCInfosForm = function (_Component) {
    _inherits(HOCInfosForm, _Component);

    function HOCInfosForm() {
      _classCallCheck(this, HOCInfosForm);

      return _possibleConstructorReturn(this, (HOCInfosForm.__proto__ || Object.getPrototypeOf(HOCInfosForm)).apply(this, arguments));
    }

    _createClass(HOCInfosForm, [{
      key: 'setUrlParams',
      value: function setUrlParams(values) {
        // 获取表单数据，转化成 url 参数
        var keys = Object.keys(values);
        var queryStr = [];

        keys.map(function (key) {
          if (!!values[key]) {
            if (_typeof(values[key]) === 'object') {
              if (!(Array.isArray(values[key]) && !values[key].length)) {
                // 空数组不做  URL 拼接处理
                queryStr.push(key + '=' + encodeURIComponent(JSON.stringify(values[key])));
              }
            } else {
              queryStr.push(key + '=' + encodeURIComponent(values[key]));
            }
          }
        });

        history.pushState({}, document.title, location.href.split('?')[0] + '?' + queryStr.join('&'));
      }
    }, {
      key: 'getUrlParams',
      value: function getUrlParams() {
        // 获取 url 参数，转换成表单数据
        var reg = /^(?:[^?]*\?)?([\w\d\-=&%]+)/;
        var matchArr = window.location.href.match(reg);
        var queryStr = matchArr[1];

        return queryStr.split('&').reduce(function (query, pair) {
          var key = '';
          var value = '';

          if (pair.indexOf('=') === -1) {
            key = decodeURIComponent(pair);
            value = void 0;
          }
          pair = decodeURIComponent(pair).split('=');
          key = pair[0];
          value = pair[1];
          query[key] = value;

          return query;
        }, {});
      }
    }, {
      key: 'render',
      value: function render() {
        var others = _objectWithoutProperties(this.props, []);

        var urlParams = this.getUrlParams();

        return _react2.default.createElement(InfosForm, _extends({}, assign({}, others, urlParams), {
          handleHocSubmit: this.setUrlParams
        }));
      }
    }]);

    return HOCInfosForm;
  }(_react.Component);

  return HOCInfosForm;
};

exports.default = WoxQueryForm;
